import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Player, {PlayerSkill} from '../../../models/actor/player/Player';
import ActorService from '../../../services/ActorService';
import {ActorPath} from '../../../services/Path';
import * as React from 'react';
import {useEffect, useState} from 'react';
import CheckIcon from "@mui/icons-material/Check";
import PlayerEditSkillTable from "./skill/PlayerEditSkillTable";
import PlayerEquipmentCard from "./equipment/PlayerEquipmentCard";
import PlayerTalentCard from "./talent/PlayerTalentCard";
import CharacteristicRow from "../common/CharacteristicRow";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import DerivedPlayerStatsRow from "./DerivedPlayerStatsRow";

interface Props {
    play: Player
}

export default function PlayerEdit(props: Props) {
    const {play} = props
    const [player, setPlayer] = useState<Player>(play)
    let navigate = useNavigate()

    useEffect(() => {
        setPlayer(play)
    }, [play])

    const onSkillChange = async (skill: PlayerSkill) => {
        player.skills.forEach((playerSkill) => {
            if (skill.name === playerSkill.name) {
                playerSkill.ranks = skill.ranks
            }
        })
        await updatePlayer(player)
    }

    const updatePlayer = async (copyPlayer: Player) => {
        copyPlayer.encumbrance = 5 + copyPlayer.brawn
        setPlayer(copyPlayer)
        await ActorService.updatePlayer(copyPlayer)
    }

    const onView = () => {
        navigate(ActorPath.Player + player.id + '/view')
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
                        <ViewFieldCard name={'Encumbrance'} value={String(player.encumbrance)}/>
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
            </CardContent>
        </Card>
    )
}
