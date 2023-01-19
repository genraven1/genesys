import {ActorPath, EquipmentPath, LorePath, Path} from "../../services/Path";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import {LoreType} from "../../models/lore/Lore";
import {useState} from "react";
import ExpandedList from "../navigation/ExpandedList";
import CreateSettingDialog from "../setting/CreateSettingDialog";
import TalentDialog from "../talents/TalentDialog";
import CreateSkillDialog from "../skills/CreateSkillDialog";
import CreateEquipmentDialog from "../equipment/CreateEquipmentDialog";
import {EquipmentType} from "../../models/equipment/Equipment";
import CreateActorDialog from "../actor/CreateActorDialog";
import ExpansionList from "../navigation/ExpansionList";

export default function Dashboard(): JSX.Element {
    let navigate = useNavigate()
    const [openSettingCreationDialog, setOpenSettingCreationDialog] = useState(false)
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false)
    const [openSkillCreationDialog, setOpenSkillCreationDialog] = useState(false)
    const [openArmorCreationDialog, setOpenArmorCreationDialog] = useState(false)
    const [openWeaponCreationDialog, setOpenWeaponCreationDialog] = useState(false)
    const [openGearCreationDialog, setOpenGearCreationDialog] = useState(false)
    const [openActorCreationDialog, setOpenActorCreationDialog] = useState(false)
    const [openPlayerCreationDialog, setOpenPlayerCreationDialog] = useState(false)
    const [openNemesisCreationDialog, setOpenNemesisCreationDialog] = useState(false)
    const [openRivalCreationDialog, setOpenRivalCreationDialog] = useState(false)
    const [openMinionCreationDialog, setOpenMinionCreationDialog] = useState(false)

    const onClick = () => {
        navigate(Path.Lore)
    }

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={'Dashboard'} />
            <CardHeader style={{textAlign: 'center'}} title={'Current Setting: Android'} />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Card>
                        <CardHeader style={{textAlign: 'center'}} title={'Setting Information'} />
                        <CardContent>
                            <Grid container justifyContent={'center'}>
                                <ExpandedList header={'Settings'} viewTitle={'View All Settings'} to={Path.Setting} dialogTitle={'Create Setting'} onClick={(): void => setOpenSettingCreationDialog(true)}/>
                                <ExpandedList header={'Talents'} viewTitle={'View All Talents'} to={Path.Talent} dialogTitle={'Create Talent'} onClick={(): void => setOpenTalentCreationDialog(true)} />
                                <ExpandedList header={'Skills'} viewTitle={'View All Skills'} to={Path.Skills} dialogTitle={'Create Skill'} onClick={(): void => setOpenSkillCreationDialog(true)} />
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Card>
                        <CardHeader style={{textAlign: 'center'}} title={'Equipment'} />
                        <CardContent>
                            <Grid container justifyContent={'center'}>
                                <ExpandedList header={'Armor'} viewTitle={'View All Armor'} to={EquipmentPath.Armor} dialogTitle={'Create Armor'} onClick={(): void => setOpenArmorCreationDialog(true)} />
                                <ExpandedList header={'Weapon'} viewTitle={'View All Weapons'} to={EquipmentPath.Weapon} dialogTitle={'Create Weapon'} onClick={(): void => setOpenWeaponCreationDialog(true)} />
                                <ExpandedList header={'Gear'} viewTitle={'View All Gear'} to={EquipmentPath.Gear} dialogTitle={'Create Gear'} onClick={(): void => setOpenGearCreationDialog(true)} />
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Card>
                        <CardHeader style={{textAlign: 'center'}} title={'Actors'} />
                        <CardContent>
                            <Grid container justifyContent={'center'}>
                                <ExpansionList header={'View Actors'} viewTitle={'View Actors'} to={ActorPath.Actor} dialogTitle={'Create Actor'} onClick={(): void => setOpenActorCreationDialog(true)} />
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Button color='primary' variant='contained' onClick={onClick}>Lore</Button>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Grid item xs>
                        <DashboardButton path={LorePath.Organization} title={LoreType.ORGANIZATION} />
                    </Grid>
                </Grid>
            </CardContent>
            {openSettingCreationDialog && <CreateSettingDialog open={openSettingCreationDialog} onClose={(): void => setOpenSettingCreationDialog(false)} />}
            {openTalentCreationDialog && <TalentDialog open={openTalentCreationDialog} onClose={(): void => setOpenTalentCreationDialog(false)} />}
            {openSkillCreationDialog && <CreateSkillDialog open={openSkillCreationDialog} onClose={(): void => setOpenSkillCreationDialog(false)} />}
            {openArmorCreationDialog && <CreateEquipmentDialog open={openArmorCreationDialog} onClose={(): void => setOpenArmorCreationDialog(false)} type={EquipmentType.Armor}/>}
            {openWeaponCreationDialog && <CreateEquipmentDialog open={openWeaponCreationDialog} onClose={(): void => setOpenWeaponCreationDialog(false)} type={EquipmentType.Weapon}/>}
            {openGearCreationDialog && <CreateEquipmentDialog open={openGearCreationDialog} onClose={(): void => setOpenGearCreationDialog(false)} type={EquipmentType.Gear}/>}
            {openActorCreationDialog && <CreateActorDialog open={openActorCreationDialog} onClose={(): void => setOpenActorCreationDialog(false)}/>}
            {openPlayerCreationDialog && <CreateActorDialog open={openPlayerCreationDialog} onClose={(): void => setOpenPlayerCreationDialog(false)}/>}
            {openNemesisCreationDialog && <CreateActorDialog open={openNemesisCreationDialog} onClose={(): void => setOpenNemesisCreationDialog(false)} />}
            {openRivalCreationDialog && <CreateActorDialog open={openRivalCreationDialog} onClose={(): void => setOpenRivalCreationDialog(false)}/>}
            {openMinionCreationDialog && <CreateActorDialog open={openMinionCreationDialog} onClose={(): void => setOpenMinionCreationDialog(false)}/>}
        </Card>
    )
}

interface DashboardProps {
    path: LorePath
    title: string
}

function DashboardButton(props: DashboardProps): JSX.Element {
    let navigate = useNavigate()

    const onClick = () => {
        navigate(props.path)
    }

    return (
        <Button color='primary' variant='contained' onClick={onClick}>{props.title}</Button>
    )
}