import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Player, {PlayerSkill} from '../../../models/actor/player/Player';
import ActorService from '../../../services/ActorService';
import {CharacteristicType} from '../../../models/character/Characteristic';
import {StatsType} from '../../../models/actor/Stats';
import {DefenseType} from '../../../models/actor/Defense';
import {ActorPath} from '../../../services/Path';
import {useEffect, useState} from 'react';
import CheckIcon from "@mui/icons-material/Check";
import {EditCharacteristicCard} from '../CharacteristicCard';
import {EditStatsCard} from "../StatsCard";
import SoakCard from "../SoakCard";
import {ActorKey} from '../../../models/actor/Actor';
import PlayerEditSkillTable from "./skill/PlayerEditSkillTable";
import PlayerEquipmentCard from "./equipment/PlayerEquipmentCard";
import Setting from "../../../models/Setting";
import EditSettingsCard from "../../common/setting/EditSettingsCard";
import * as React from "react";
import SettingService from "../../../services/SettingService";
import {EditDefenseCard} from "../DefenseCard";
import PlayerTalentCard from "./talent/PlayerTalentCard";
import CareerSelectCard from "./CareerSelectCard";
import Career from "../../../models/actor/player/Career";
import CareerSkillSelectDialog from "./skill/CareerSkillSelectDialog";
import Skill from "../../../models/actor/Skill";
import ArchetypeSelectCard from "./ArchetypeSelectCard";
import Archetype from "../../../models/actor/player/Archetype";

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

    const onChange = async (key: keyof Player, value: number) => {
        if (value === null || (player !== null && player[key] === value)) {
            return;
        }
        const copyPlayer = {...player} as Player
        switch (key) {
            case 'brawn':
                copyPlayer.brawn = value
                break;
            case 'agility':
                copyPlayer.agility = value
                break;
            case 'intellect':
                copyPlayer.intellect = value
                break;
            case 'cunning':
                copyPlayer.cunning = value
                break;
            case 'willpower':
                copyPlayer.willpower = value
                break;
            case 'presence':
                copyPlayer.presence = value
                break;
            case 'melee':
                copyPlayer.melee = value
                break;
            case 'ranged':
                copyPlayer.ranged = value
                break;
            case 'wounds':
                copyPlayer.wounds = value
                break
            case 'strain':
                copyPlayer.strain = value
                break
            default:
                break
        }

        await updatePlayer(copyPlayer)
    }

    const updatePlayer = async (copyPlayer: Player) => {
        copyPlayer.soak = copyPlayer.brawn
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
                        <Grid item xs>
                            <ArchetypeSelectCard defaultValue={player.archetype} onCommit={(value: Archetype): void => {
                                onArchetypeChange(value)
                            }}/>
                            <CareerSelectCard defaultValue={player.career} onCommit={(value: Career): void => {
                                onCareerChange(value)
                            }}/>
                            {openCareerSkillDialog && <CareerSkillSelectDialog open={openCareerSkillDialog}
                                                                               onClose={(): void => setOpenCareerSkillDialog(false)}
                                                                               player={player}/>}
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={2}>
                        <EditCharacteristicCard characteristic={player?.brawn!!} type={CharacteristicType.Brawn}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Brawn, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={player?.agility!!} type={CharacteristicType.Agility}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Agility, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={player?.intellect!!} type={CharacteristicType.Intellect}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Intellect, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={player?.cunning!!} type={CharacteristicType.Cunning}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Cunning, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={player?.willpower!!} type={CharacteristicType.Willpower}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Willpower, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={player?.presence!!} type={CharacteristicType.Presence}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Presence, value)
                                                }}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={2}>
                        <SoakCard soak={player?.soak!!}/>
                        <EditStatsCard stats={player?.wounds!!} type={StatsType.Wounds}
                                       onChange={(value: number): void => {
                                           onChange(ActorKey.Wounds, value)
                                       }}/>
                        <EditStatsCard stats={player?.strain!!} type={StatsType.Strain}
                                       onChange={(value: number): void => {
                                           onChange(ActorKey.Strain, value)
                                       }}/>
                        <EditDefenseCard defense={player?.melee!!} type={DefenseType.Melee}
                                         onChange={(value: number): void => {
                                             onChange(ActorKey.Melee, value)
                                         }}/>
                        <EditDefenseCard defense={player?.ranged!!} type={DefenseType.Ranged}
                                         onChange={(value: number): void => {
                                             onChange(ActorKey.Ranged, value)
                                         }}/>
                    </Grid>
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
