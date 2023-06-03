import {Button, Card, CardContent, CardHeader} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {Weapon} from "../../../models/equipment/Weapon";
import WeaponQualityTable from "./WeaponQualityTable";
import WeaponQualitySelectionDialog from "./WeaponQualitySelectionDialog";

interface Props {
    weapon: Weapon
}

export default function WeaponQualityCard(props: Props): JSX.Element {
    const {weapon} = props
    const [openAddWeaponQualityDialog, setOpenAddWeaponQualityDialog] = useState(false)

    const renderTable = (): JSX.Element => {
        if (weapon?.qualities!!.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return <WeaponQualityTable weapon={weapon}/>
    }

    return (
        <Card sx={{"width": 1}}>
            <CardHeader title={'Abilities'} style={{textAlign: 'center'}}/>
            <CardContent>
                {renderTable()}
                <Button color='primary' variant='contained' onClick={(): void => setOpenAddWeaponQualityDialog(true)}>Add
                    Special Quality</Button>
                {openAddWeaponQualityDialog &&
                    <WeaponQualitySelectionDialog weapon={weapon} open={openAddWeaponQualityDialog}
                                                  onClose={(): void => setOpenAddWeaponQualityDialog(false)}/>}
            </CardContent>
        </Card>
    )
}