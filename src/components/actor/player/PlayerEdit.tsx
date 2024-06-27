import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Player, {Experience, PlayerSkill} from '../../../models/actor/player/Player';
import ActorService from '../../../services/ActorService';
import {ActorPath} from '../../../services/RootPath';
import * as React from 'react';
import {useEffect, useState} from 'react';
import CheckIcon from "@mui/icons-material/Check";
import PlayerEditSkillTable from "./skill/PlayerEditSkillTable";
import PlayerEquipmentCard from "./equipment/PlayerEquipmentCard";
import Setting from "../../../models/Setting";
import EditSettingsCard from "../../common/setting/EditSettingsCard";
import SettingService from "../../../services/SettingService";
import PlayerTalentCard from "./talent/PlayerTalentCard";
import CareerSelectCard from "./CareerSelectCard";
import Career from "../../../models/actor/player/Career";
import CareerSkillSelectDialog from "./skill/CareerSkillSelectDialog";
import Skill from "../../../models/actor/Skill";
import ArchetypeSelectCard from "./ArchetypeSelectCard";
import Archetype from "../../../models/actor/player/Archetype";
import CharacteristicRow from "../common/CharacteristicRow";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import DerivedPlayerStatsRow from "./DerivedPlayerStatsRow";

interface Props {
    play: Player
    settings: Setting[]
}

export default function PlayerView(props: Props) {
    const {play, settings} = props
    const [player, setPlayer] = useState<Player>(play)
    const [openCareerSkillDialog, setOpenCareerSkillDialog] = useState(false)
    let navigate = useNavigate()

    useEffect(() => {
        setPlayer(play)
    }, [play])

    const onSettingAddition = async (name: string) => {
        const copyPlayer = {...player} as Player
        let setting = await SettingService.getSetting(name)
        copyPlayer.settings = copyPlayer.settings.concat(setting)
        await updatePlayer(copyPlayer)
    }

    const onSettingRemoval = async (name: string) => {
        const copyPlayer = {...player} as Player
        copyPlayer.settings.forEach((set, index) => {
            if (set.name === name) {
                copyPlayer.settings.splice(index, 1)
            }
        })
        await updatePlayer(copyPlayer)
    }

    const onSkillChange = async (skill: PlayerSkill) => {
        player.skills.forEach((playerSkill) => {
            if (skill.name === playerSkill.name) {
                playerSkill.ranks = skill.ranks
            }
        })
        await updatePlayer(player)
    }

    const onArchetypeChange = async (archetype: Archetype) => {
        player.archetype = archetype
        player.brawn = archetype.brawn
        player.agility = archetype.agility
        player.intellect = archetype.intellect
        player.cunning = archetype.cunning
        player.willpower = archetype.willpower
        player.presence = archetype.presence
        player.wounds = archetype.wounds + archetype.brawn
        player.strain = archetype.strain + archetype.willpower
        player.experience = {total: archetype.experience, available: archetype.experience} as Experience
        player.skills.forEach((playerSkill) => {
            if (archetype.skill.name === playerSkill.name) {
                playerSkill.ranks = 1
            }
        })
        await updatePlayer(player)
    }

    const onCareerChange = async (value: Career) => {
        player.career = value
        player.skills.forEach((playerSkill, index) => {
            player.career.skills.forEach((skill: Skill) => {
                if (skill.name === playerSkill.name) {
                    playerSkill.career = true
                    player.skills[index] = playerSkill
                }
            })
        })
        setOpenCareerSkillDialog(true)
        await updatePlayer(player)
    }

    const updatePlayer = async (copyPlayer: Player) => {
        copyPlayer.encumbrance = 5 + copyPlayer.brawn
        setPlayer(copyPlayer)
        await ActorService.updatePlayer(copyPlayer.name, copyPlayer)
    }

    const onView = () => {
        navigate(ActorPath.Player + player.name + '/view')
    }

    return (
        <Card>
            <CardHeader title={player.name} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}/>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <ArchetypeSelectCard defaultValue={player.archetype} onCommit={(value: Archetype): void => {
                            onArchetypeChange(value)
                        }}/>
                        <CareerSelectCard defaultValue={player.career} onCommit={(value: Career): void => {
                            onCareerChange(value)
                        }}/>
                        <ViewFieldCard name={'Encumbrance'} value={String(player.encumbrance)}/>
                        {openCareerSkillDialog && <CareerSkillSelectDialog open={openCareerSkillDialog}
                                                                           onClose={(): void => setOpenCareerSkillDialog(false)}
                                                                           player={player}/>}
                    </Grid>
                    <Divider/>
                    <CharacteristicRow actor={player}/>
                    <Divider/>
                    <DerivedPlayerStatsRow player={player}/>
                    <Divider/>
                    <PlayerEditSkillTable player={player} onSkillChange={onSkillChange}/>
                    <Divider/>
                    <PlayerEquipmentCard player={player}/>
                    <Divider/>
                    <PlayerTalentCard player={player}/>
                </Grid>
                <EditSettingsCard settings={player.settings} onSettingAddition={onSettingAddition}
                                  onSettingRemoval={onSettingRemoval} allSettings={settings}/>
            </CardContent>
        </Card>
    )
}
