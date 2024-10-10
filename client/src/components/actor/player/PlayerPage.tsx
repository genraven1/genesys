import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Player from '../../../models/actor/player/Player';
import {ActorPath, RootPath} from '../../../services/Path';
import EditIcon from "@mui/icons-material/Edit";
import ViewPlayerSkillTable from './skill/ViewPlayerSkills';
import CharacteristicRow from "../common/CharacteristicRow";
import PlayerTalentCard from "./talent/PlayerTalentCard";
import PlayerEquipmentCard from "./equipment/PlayerEquipmentCard";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import DerivedPlayerStatsRow from "./DerivedPlayerStatsRow";
import {Fragment, useEffect, useState} from "react";
import Career from "../../../models/actor/player/Career";
import Skill from "../../../models/actor/Skill";
import CareerService from "../../../services/CareerService";
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";
import ActorService from "../../../services/ActorService";

export default function PlayerPage() {
    const {id} = useParams<{ id: string }>()
    const [player, setPlayer] = useState<Player | null>(null)
    let pathname = useLocation().pathname
    let navigate = useNavigate()

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setPlayer(await ActorService.getPlayer(id))
        })()
    }, [id, setPlayer])

    if (!player) {
        return <Fragment/>;
    }

    const onPageChange = () => {
        if (pathname.endsWith('/view')) {
            return (
                <IconButton title='Edit' size='small'
                            onClick={(): void => navigate(ActorPath.Player + id + '/edit')}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        } else {
            return (
                <IconButton title='View' size='small'
                            onClick={(): void => navigate(ActorPath.Player + id + '/view')}>
                    <CheckIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        }
    }

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={player.name} action={onPageChange()}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <ViewFieldCard name={'Archetype'} value={player?.archetype?.name!}/>
                        <ViewFieldCard name={'Career'} value={player?.career?.name!}/>
                        <ViewFieldCard name={'Encumbrance'} value={String(player.encumbrance)}/>
                    </Grid>
                    <Divider/>
                    <CharacteristicRow actor={player}/>
                    <Divider/>
                    <DerivedPlayerStatsRow player={player}/>
                    <Divider/>
                    <ViewPlayerSkillTable player={player}/>
                    <Divider/>
                    <PlayerEquipmentCard player={player}/>
                    <Divider/>
                    <PlayerTalentCard player={player}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
