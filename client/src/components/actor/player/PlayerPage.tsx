import {Card, CardContent, Divider, Grid} from '@mui/material';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Player from '../../../models/actor/player/Player';
import {ActorPath} from '../../../services/Path';
import ViewPlayerSkillTable from './skill/ViewPlayerSkills';
import CharacteristicRow from "../common/CharacteristicRow";
import PlayerTalentCard from "./talent/PlayerTalentCard";
import PlayerEquipmentCard from "./equipment/PlayerEquipmentCard";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import DerivedPlayerStatsRow from "./DerivedPlayerStatsRow";
import {Fragment, useEffect, useState} from "react";
import Career from "../../../models/actor/player/Career";
import * as React from "react";
import ActorService from "../../../services/ActorService";
import CenteredCardHeaderWithAction from "../../common/card/CenteredCardHeaderWithAction";
import ArchetypeSelectCard from "./ArchetypeSelectCard";
import Archetype from "../../../models/actor/player/Archetype";
import CareerSelectCard from "./CareerSelectCard";

export default function PlayerPage() {
    const {id} = useParams<{ id: string }>();
    const [player, setPlayer] = useState<Player | null>(null);
    let pathname = useLocation().pathname;
    let navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setPlayer(await ActorService.getPlayer(id));
        })()
    }, [id, setPlayer])

    if (!player) {
        return <Fragment/>;
    }

    const handleArchetypeChange = async (value: Archetype) => {
        if (player) {
            setPlayer(await ActorService.updatePlayer({...player, archetype: value}));
        }
    };

    const handleCareerChange = async (value: Career) => {
        if (player) {
            setPlayer(await ActorService.updatePlayer({...player, career: value}));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={player.name} path={ActorPath.Player + player.id}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <ArchetypeSelectCard defaultValue={player.archetype} onCommit={handleArchetypeChange}/>
                        <CareerSelectCard defaultValue={player.career} onCommit={handleCareerChange}/>
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
