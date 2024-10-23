import {EquipmentPath} from "../../../client/src/services/RootPath";
import {Card, CardContent, Grid} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import CreateEquipmentDialog from "../equipment/CreateEquipmentDialog";
import {EquipmentType} from "../../models/equipment/Equipment";
import ExpansionList from "../navigation/ExpansionList";
import CenteredCardHeader from "../common/card/CenteredCardHeader";

export default function EquipmentDashboard() {
    const [openArmorCreationDialog, setOpenArmorCreationDialog] = useState(false)
    const [openWeaponCreationDialog, setOpenWeaponCreationDialog] = useState(false)
    const [openGearCreationDialog, setOpenGearCreationDialog] = useState(false)

    return (
        <Card  sx={{ width: 1}}>
            <CenteredCardHeader title={'Equipment Dashboard'}/>
            <CardContent>
                <Grid container justifyContent={'center'}  sx={{ width: 1}}>
                    <ExpansionList header={'Armor'} viewTitle={'View All Armor'} to={EquipmentPath.Armor}
                                   dialogTitle={'Create Armor'}
                                   onClick={(): void => setOpenArmorCreationDialog(true)}/>
                    <ExpansionList header={'Weapon'} viewTitle={'View All Weapons'}
                                   to={EquipmentPath.Weapon}
                                   dialogTitle={'Create Weapon'}
                                   onClick={(): void => setOpenWeaponCreationDialog(true)}/>
                    <ExpansionList header={'Gear'} viewTitle={'View All Gear'} to={EquipmentPath.Gear}
                                   dialogTitle={'Create Gear'}
                                   onClick={(): void => setOpenGearCreationDialog(true)}/>
                </Grid>
            </CardContent>
            {openArmorCreationDialog && <CreateEquipmentDialog open={openArmorCreationDialog}
                                                               onClose={(): void => setOpenArmorCreationDialog(false)}
                                                               type={EquipmentType.Armor}/>}
            {openWeaponCreationDialog && <CreateEquipmentDialog open={openWeaponCreationDialog}
                                                                onClose={(): void => setOpenWeaponCreationDialog(false)}
                                                                type={EquipmentType.Weapon}/>}
            {openGearCreationDialog && <CreateEquipmentDialog open={openGearCreationDialog}
                                                              onClose={(): void => setOpenGearCreationDialog(false)}
                                                              type={EquipmentType.Gear}/>}
        </Card>
    )
}