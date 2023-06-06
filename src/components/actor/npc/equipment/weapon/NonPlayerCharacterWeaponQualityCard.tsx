import {Button, Card, CardContent, CardHeader} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {ActorWeapon} from "../../../../../models/equipment/Weapon";
import WeaponQualitySelectionDialog from "../../../../equipment/weapon/WeaponQualitySelectionDialog";
import WeaponQualityTable from "../../../../equipment/weapon/WeaponQualityTable";

interface Props {
    weapon: ActorWeapon
}

export default function NonPlayerCharacterWeaponQualityCard(props: Props): JSX.Element {
    const {weapon} = props
    const [openAddWeaponQualityDialog, setOpenAddWeaponQualityDialog] = useState(false)

    const renderTable = (): JSX.Element => {
        if (!weapon?.qualities!! || weapon?.qualities!!.length === 0)  {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return <WeaponQualityTable weapon={weapon}/>
    }

    return (
        <Card sx={{"width": 1}}>
            <CardHeader title={'Weapon Special Qualities'} style={{textAlign: 'center'}}/>
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