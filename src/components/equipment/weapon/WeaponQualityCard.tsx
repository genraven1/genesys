import {Button, Card, CardContent, TableFooter} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {Fragment, useState} from "react";
import {Weapon} from "../../../models/equipment/Weapon";
import WeaponQualityTable from "./WeaponQualityTable";
import WeaponQualitySelectionDialog from "./WeaponQualitySelectionDialog";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import TableRow from "@mui/material/TableRow";
import {useLocation} from "react-router-dom";

interface Props {
    weapon: Weapon
}

export default function WeaponQualityCard(props: Props) {
    const {weapon} = props
    const pathname = useLocation().pathname
    const [openAddWeaponQualityDialog, setOpenAddWeaponQualityDialog] = useState(false)

    const renderTable = () => {
        if (weapon.qualities === undefined || weapon.qualities.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return <WeaponQualityTable weapon={weapon}/>
    }

    const renderTableFooter = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <TableFooter>
                    <TableRow>
                        <Button color='primary' variant='contained' onClick={(): void => setOpenAddWeaponQualityDialog(true)}>Add
                            Special Quality</Button>
                        {openAddWeaponQualityDialog &&
                            <WeaponQualitySelectionDialog weapon={weapon} open={openAddWeaponQualityDialog}
                                                          onClose={(): void => setOpenAddWeaponQualityDialog(false)}/>}
                    </TableRow>
                </TableFooter>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Weapon Special Qualities'}/>
            <CardContent>
                {renderTable()}
                {renderTableFooter()}
            </CardContent>
        </Card>
    )
}