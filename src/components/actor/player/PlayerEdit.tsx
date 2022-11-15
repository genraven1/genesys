import {Button, Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import Player from '../../../models/actor/player/Player';
import ActorService from '../../../services/ActorService';
import {CharacteristicType} from '../../../models/actor/Characteristics';
import {StatsType} from '../../../models/actor/Stats';
import {DefenseType} from '../../../models/actor/Defense';
import { Path } from '../../../services/Path';
import { useState } from 'react';
import CheckIcon from "@mui/icons-material/Check";
import PlayerTalentTable from "./PlayerTalentTable";
import EditCharacteristicCard from '../EditCharacteristicCard';
import SkillTable from "../npc/nemesis/NemesisSkillTable";
import StatsCard from "../StatsCard";
import SoakCard from "../SoakCard";
import TalentSelectionDialog from "../npc/TalentSelectionDialog";
import DefenseCard from "../DefenseCard";
import { ActorKey } from '../../../models/actor/Actor';

export default function PlayerView(props: {play: Player}) {
    const {play} = props
    const { name } = useParams<{ name: string }>()
    const [player, setPlayer] = useState<Player>(play)
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false)
    let navigate = useNavigate()

    const onChange = async (key: keyof Player, value: number) => {
        if (value === null || (player !== null && player[key] === value)) {
            return;
        }
        const copyPlayer = {...player} as Player
        switch (key) {
            case 'brawn':
                copyPlayer.brawn.current = value
                break;
            case 'agility':
                copyPlayer.agility.current = value
                break;
            case 'intellect':
                copyPlayer.intellect.current = value
                break;
            case 'cunning':
                copyPlayer.cunning.current = value
                break;
            case 'willpower':
                copyPlayer.willpower.current = value
                break;
            case 'presence':
                copyPlayer.presence.current = value
                break;
            case 'melee':
                copyPlayer.melee.current = value
                break;
            case 'ranged':
                copyPlayer.ranged.current = value
                break;
            case 'wounds':
                copyPlayer.wounds.max = value
                break
            case 'strain':
                copyPlayer.strain.max = value
                break
            default:
                break
        }

        await updatePlayer(copyPlayer)
    }

    const updatePlayer = async (copyPlayer: Player) => {
        copyPlayer.soak = copyPlayer.brawn.current
        setPlayer(copyPlayer)
        await ActorService.updatePlayer(copyPlayer.name, copyPlayer)
        return player!!
    }

    const onView = () => {
        navigate(Path.Player + name + '/view')
    }

    return (
            <Card>
                <CardHeader title={name} style={{ textAlign: 'center' }} action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                    <CheckIcon color='primary' fontSize='small' />
                </IconButton>}/>
                <Divider />
                <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <EditCharacteristicCard characteristic={player?.brawn!!} type={CharacteristicType.Brawn} onChange={(value: number): void => { onChange(ActorKey.Brawn, value) }}/>
                        <EditCharacteristicCard characteristic={player?.agility!!} type={CharacteristicType.Agility} onChange={(value: number): void => { onChange(ActorKey.Agility, value) }}/>
                        <EditCharacteristicCard characteristic={player?.intellect!!} type={CharacteristicType.Intellect} onChange={(value: number): void => { onChange(ActorKey.Intellect, value) }}/>
                        <EditCharacteristicCard characteristic={player?.cunning!!} type={CharacteristicType.Cunning} onChange={(value: number): void => { onChange(ActorKey.Cunning, value) }}/>
                        <EditCharacteristicCard characteristic={player?.willpower!!} type={CharacteristicType.Willpower} onChange={(value: number): void => { onChange(ActorKey.Willpower, value) }}/>
                        <EditCharacteristicCard characteristic={player?.presence!!} type={CharacteristicType.Presence} onChange={(value: number): void => { onChange(ActorKey.Presence, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <SoakCard soak={player?.soak!!} />
                        <StatsCard stats={player?.wounds!!} type={StatsType.Wounds} onChange={(value: number): void => { onChange(ActorKey.Wounds, value) }}/>
                        <StatsCard stats={player?.strain!!} type={StatsType.Strain} onChange={(value: number): void => { onChange(ActorKey.Strain, value) }}/>
                        <DefenseCard defense={player?.melee!!} type={DefenseType.Melee} onChange={(value: number): void => { onChange(ActorKey.Melee, value) }}/>
                        <DefenseCard defense={player?.ranged!!} type={DefenseType.Ranged} onChange={(value: number): void => { onChange(ActorKey.Ranged, value) }}/>
                    </Grid>
                    <Divider />
                    <SkillTable player={player}/>
                    <Divider />
                    <Button onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                    {openSelectTalentDialog && <TalentSelectionDialog actor={player} open={openSelectTalentDialog} onClose={(): void => setOpenSelectTalentDialog(false)}/>}
                    <PlayerTalentTable player={player}/>
                </Grid>
                </CardContent>
            </Card>
            )
}
