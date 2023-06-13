import {ActorPath, EquipmentPath, LorePath, Path} from "../../services/Path";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import {LoreType} from "../../models/lore/Lore";
import {useEffect, useState} from "react";
import CreateSettingDialog from "../setting/CreateSettingDialog";
import TalentDialog from "../talents/TalentDialog";
import CreateSkillDialog from "../skills/CreateSkillDialog";
import CreateEquipmentDialog from "../equipment/CreateEquipmentDialog";
import {EquipmentType} from "../../models/equipment/Equipment";
import CreateNonPlayerCharacterDialog from "../actor/npc/CreateNonPlayerCharacterDialog";
import ExpansionList from "../navigation/ExpansionList";
import Setting from "../../models/Setting";
import SettingSelectionDialog from "../setting/SettingSelectionDialog";
import {NavigateFunction} from "react-router";
import SettingService from "../../services/SettingService";
import QualityDialog from "../qualities/QualityDialog";
import CreatePlayerDialog from "../actor/player/CreatePlayerDialog";

export default function Dashboard(): JSX.Element {
    let navigate = useNavigate()
    const [openSettingCreationDialog, setOpenSettingCreationDialog] = useState(false)
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false)
    const [openQualityCreationDialog, setOpenQualityCreationDialog] = useState(false)
    const [openSkillCreationDialog, setOpenSkillCreationDialog] = useState(false)
    const [openArmorCreationDialog, setOpenArmorCreationDialog] = useState(false)
    const [openWeaponCreationDialog, setOpenWeaponCreationDialog] = useState(false)
    const [openGearCreationDialog, setOpenGearCreationDialog] = useState(false)
    const [openActorCreationDialog, setOpenActorCreationDialog] = useState(false)
    const [openPlayerCreationDialog, setOpenPlayerCreationDialog] = useState(false)
    const [openSettingSelectionDialog, setOpenSettingSelectionDialog] = useState(false)
    const [setting, setSetting] = useState<Setting>()

    useEffect(() => {
        (async (): Promise<void> => {
            const current = await SettingService.getCurrentSetting()
            if (!current) {
                return
            }
            setSetting(current)
        })()
    }, [setSetting])

    const getSubHeader = (): string => {
        return 'Current Setting: ' + setting?.name!!
    }

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={'Dashboard'} subheader={getSubHeader()}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Card>
                        <CardHeader style={{textAlign: 'center'}} title={'Setting Information'}/>
                        <CardContent>
                            <Grid container justifyContent={'center'}>
                                <ExpansionList header={'Settings'} viewTitle={'View All Settings'} to={Path.Setting}
                                               dialogTitle={'Create Setting'}
                                               onClick={(): void => setOpenSettingCreationDialog(true)}/>
                                <ExpansionList header={'Talents'} viewTitle={'View All Talents'} to={Path.Talent}
                                               dialogTitle={'Create Talent'}
                                               onClick={(): void => setOpenTalentCreationDialog(true)}/>
                                <ExpansionList header={'Qualities'} viewTitle={'View All Qualities'} to={Path.Qualities}
                                               dialogTitle={'Create Quality'}
                                               onClick={(): void => setOpenQualityCreationDialog(true)}/>
                                <ExpansionList header={'Skills'} viewTitle={'View All Skills'} to={Path.Skills}
                                               dialogTitle={'Create Skill'}
                                               onClick={(): void => setOpenSkillCreationDialog(true)}/>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Card>
                        <CardHeader style={{textAlign: 'center'}} title={'Equipment'}/>
                        <CardContent>
                            <Grid container justifyContent={'center'}>
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
                    </Card>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Card>
                        <CardHeader style={{textAlign: 'center'}} title={'Actors'}/>
                        <CardContent>
                            <Grid container justifyContent={'center'}>
                                <ExpansionList header={'View NPCs'} viewTitle={'View NPCs'} to={ActorPath.Npc}
                                               dialogTitle={'Create NPC'}
                                               onClick={(): void => setOpenActorCreationDialog(true)}/>
                                <ExpansionList header={'View Players'} viewTitle={'View Players'} to={ActorPath.Player}
                                               dialogTitle={'Create Player'}
                                               onClick={(): void => setOpenPlayerCreationDialog(true)}/>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Button color='primary' variant='contained'
                            onClick={(): void => setOpenSettingSelectionDialog(true)}>Setting</Button>
                    {openSettingSelectionDialog && <SettingSelectionDialog open={openSettingSelectionDialog}
                                                                           onClose={(): void => setOpenSettingSelectionDialog(false)}
                                                                           current={setting!!}/>}
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Button color='primary' variant='contained' onClick={() => navigate(Path.Lore)}>Lore</Button>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Grid item xs>
                        <DashboardButton path={LorePath.Organization} title={LoreType.ORGANIZATION}
                                         navigate={navigate}/>
                    </Grid>
                </Grid>
            </CardContent>
            {openSettingCreationDialog && <CreateSettingDialog open={openSettingCreationDialog}
                                                               onClose={(): void => setOpenSettingCreationDialog(false)}/>}
            {openTalentCreationDialog && <TalentDialog open={openTalentCreationDialog}
                                                       onClose={(): void => setOpenTalentCreationDialog(false)}/>}
            {openQualityCreationDialog && <QualityDialog open={openQualityCreationDialog}
                                                         onClose={(): void => setOpenQualityCreationDialog(false)}/>}
            {openSkillCreationDialog && <CreateSkillDialog open={openSkillCreationDialog}
                                                           onClose={(): void => setOpenSkillCreationDialog(false)}/>}
            {openArmorCreationDialog && <CreateEquipmentDialog open={openArmorCreationDialog}
                                                               onClose={(): void => setOpenArmorCreationDialog(false)}
                                                               type={EquipmentType.Armor}/>}
            {openWeaponCreationDialog && <CreateEquipmentDialog open={openWeaponCreationDialog}
                                                                onClose={(): void => setOpenWeaponCreationDialog(false)}
                                                                type={EquipmentType.Weapon}/>}
            {openGearCreationDialog && <CreateEquipmentDialog open={openGearCreationDialog}
                                                              onClose={(): void => setOpenGearCreationDialog(false)}
                                                              type={EquipmentType.Gear}/>}
            {openActorCreationDialog && <CreateNonPlayerCharacterDialog open={openActorCreationDialog}
                                                                        onClose={(): void => setOpenActorCreationDialog(false)}/>}
            {openPlayerCreationDialog && <CreatePlayerDialog open={openPlayerCreationDialog}
                                                             onClose={(): void => setOpenPlayerCreationDialog(false)}/>}
        </Card>
    )
}

interface DashboardProps {
    path: LorePath
    title: string
    navigate: NavigateFunction
}

function DashboardButton(props: DashboardProps): JSX.Element {
    const {path, title, navigate} = props
    return (
        <Button color='primary' variant='contained' onClick={() => navigate(path)}>{title}</Button>
    )
}