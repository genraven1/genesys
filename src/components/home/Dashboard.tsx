import {ActorPath, EquipmentPath, LorePath, Path} from "../../services/Path";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import {LoreType} from "../../models/lore/Lore";
import {useEffect, useState} from "react";
import ExpandedList from "../navigation/ExpandedList";
import CreateSettingDialog from "../setting/CreateSettingDialog";
import TalentDialog from "../talents/TalentDialog";
import CreateSkillDialog from "../skills/CreateSkillDialog";
import CreateEquipmentDialog from "../equipment/CreateEquipmentDialog";
import {EquipmentType} from "../../models/equipment/Equipment";
import CreateActorDialog from "../actor/CreateActorDialog";
import ExpansionList from "../navigation/ExpansionList";
import SettingService from "../../services/SettingService";
import Setting from "../../models/Setting";
import SettingSelectionDialog from "../setting/SettingSelectionDialog";
import CreateCareerDialog from "../career/CreateCareerDialog";

export default function Dashboard(): JSX.Element {
    let navigate = useNavigate()
    const [openSettingCreationDialog, setOpenSettingCreationDialog] = useState(false)
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false)
    const [openSkillCreationDialog, setOpenSkillCreationDialog] = useState(false)
    const [openCareerCreationDialog, setOpenCareerCreationDialog] = useState(false)
    const [openArmorCreationDialog, setOpenArmorCreationDialog] = useState(false)
    const [openWeaponCreationDialog, setOpenWeaponCreationDialog] = useState(false)
    const [openGearCreationDialog, setOpenGearCreationDialog] = useState(false)
    const [openActorCreationDialog, setOpenActorCreationDialog] = useState(false)
    const [openSettingSelectionDialog, setOpenSettingSelectionDialog] = useState(false)
    const [setting, setSetting] = useState<Setting>()

    useEffect(() => {
        (async (): Promise<void> => {
            const current = await SettingService.getCurrentSetting()
            if (!current) { return }
            setSetting(current)
        })()
    }, [setSetting])

    const onLoreClick = () => {
        navigate(Path.Lore)
    }

    const getSubHeader = (): string => {
        return 'Current Setting: ' + setting?.name!!
    }

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={'Dashboard'} subheader={getSubHeader()}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Card>
                        <CardHeader style={{textAlign: 'center'}} title={'Setting Information'} />
                        <CardContent>
                            <Grid container justifyContent={'center'}>
                                <ExpandedList header={'Settings'} viewTitle={'View All Settings'} to={Path.Setting} dialogTitle={'Create Setting'} onClick={(): void => setOpenSettingCreationDialog(true)}/>
                                <ExpandedList header={'Talents'} viewTitle={'View All Talents'} to={Path.Talent} dialogTitle={'Create Talent'} onClick={(): void => setOpenTalentCreationDialog(true)} />
                                <ExpandedList header={'Skills'} viewTitle={'View All Skills'} to={Path.Skills} dialogTitle={'Create Skill'} onClick={(): void => setOpenSkillCreationDialog(true)} />
                                <ExpandedList header={'Careers'} viewTitle={'View All Careers'} to={Path.Career} dialogTitle={'Create Career'} onClick={(): void => setOpenCareerCreationDialog(true)} />
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
                    <Button color='primary' variant='contained' onClick={(): void => setOpenSettingSelectionDialog(true)}>Setting</Button>
                    {openSettingSelectionDialog && <SettingSelectionDialog open={openSettingSelectionDialog} onClose={(): void => setOpenSettingSelectionDialog(false)}  current={setting?.name!!}/>}
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Button color='primary' variant='contained' onClick={onLoreClick}>Lore</Button>
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
            {openCareerCreationDialog && <CreateCareerDialog open={openCareerCreationDialog} onClose={(): void => setOpenCareerCreationDialog(false)} />}
            {openArmorCreationDialog && <CreateEquipmentDialog open={openArmorCreationDialog} onClose={(): void => setOpenArmorCreationDialog(false)} type={EquipmentType.Armor}/>}
            {openWeaponCreationDialog && <CreateEquipmentDialog open={openWeaponCreationDialog} onClose={(): void => setOpenWeaponCreationDialog(false)} type={EquipmentType.Weapon}/>}
            {openGearCreationDialog && <CreateEquipmentDialog open={openGearCreationDialog} onClose={(): void => setOpenGearCreationDialog(false)} type={EquipmentType.Gear}/>}
            {openActorCreationDialog && <CreateActorDialog open={openActorCreationDialog} onClose={(): void => setOpenActorCreationDialog(false)}/>}
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