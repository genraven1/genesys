import {Path} from "../../services/Path";
import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import SettingDialog from "../setting/SettingDialog";
import TalentDialog from "../talents/TalentDialog";
import CreateSkillDialog from "../skills/CreateSkillDialog";
import ExpansionList from "../navigation/ExpansionList";
import Setting from "../../models/Setting";
import SettingSelectionDialog from "../setting/SettingSelectionDialog";
import SettingService from "../../services/SettingService";
import QualityDialog from "../qualities/QualityDialog";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import CreateInjuryDialog from "../injuries/CreateInjuryDialog";
import CreateSpellDialog from "../spell/CreateSpellDialog";

export default function MainDashboard(): JSX.Element {
    const [openSettingCreationDialog, setOpenSettingCreationDialog] = useState(false)
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false)
    const [openQualityCreationDialog, setOpenQualityCreationDialog] = useState(false)
    const [openSkillCreationDialog, setOpenSkillCreationDialog] = useState(false)
    const [openInjuryCreationDialog, setOpenInjuryCreationDialog] = useState(false)
    const [openSpellCreationDialog, setOpenSpellCreationDialog] = useState(false)
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
            <CenteredCardHeader title={getSubHeader()}/>
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
                        <CardHeader style={{textAlign: 'center'}} title={'System Information'}/>
                        <CardContent>
                            <Grid container justifyContent={'center'}>
                                <ExpansionList header={'Critical Injuries'} viewTitle={'View All Critical Injuries'} to={Path.Injury}
                                               dialogTitle={'Create Critical Injury'}
                                               onClick={(): void => setOpenInjuryCreationDialog(true)}/>
                                <ExpansionList header={'Spells'} viewTitle={'View All Spells'} to={Path.Spell}
                                               dialogTitle={'Create Spell'}
                                               onClick={(): void => setOpenSpellCreationDialog(true)}/>
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
            </CardContent>
            {openSettingCreationDialog && <SettingDialog open={openSettingCreationDialog}
                                                         onClose={(): void => setOpenSettingCreationDialog(false)}/>}
            {openTalentCreationDialog && <TalentDialog open={openTalentCreationDialog}
                                                       onClose={(): void => setOpenTalentCreationDialog(false)}/>}
            {openQualityCreationDialog && <QualityDialog open={openQualityCreationDialog}
                                                         onClose={(): void => setOpenQualityCreationDialog(false)}/>}
            {openSkillCreationDialog && <CreateSkillDialog open={openSkillCreationDialog}
                                                            onClose={(): void => setOpenSkillCreationDialog(false)}/>}
            {openInjuryCreationDialog && <CreateInjuryDialog open={openInjuryCreationDialog}
                                                            onClose={(): void => setOpenInjuryCreationDialog(false)}/>}
            {openSpellCreationDialog && <CreateSpellDialog open={openSpellCreationDialog}
                                                            onClose={(): void => setOpenSpellCreationDialog(false)}/>}
        </Card>
    )
}