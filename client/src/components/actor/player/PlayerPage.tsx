import {Card, CardContent, Divider, Grid} from '@mui/material';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Player from '../../../models/actor/player/Player';
import {ActorPath, RootPath} from '../../../services/Path';
import EditIcon from "@mui/icons-material/Edit";
import ViewPlayerSkillTable from './skill/ViewPlayerSkills';
import CharacteristicRow, {PlayerCharacteristicRow} from "../common/CharacteristicRow";
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
import {CharacteristicType} from "../../../models/character/Characteristic";
import ArchetypeService from "../../../services/ArchetypeService";
import CenteredCardHeaderWithAction from "../../common/card/CenteredCardHeaderWithAction";
import ArchetypeSelectCard from "./ArchetypeSelectCard";
import Archetype from "../../../models/actor/player/Archetype";

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

    // const handleCharacteristicChange = async (characteristic: CharacteristicType, value: number) => {
    //     if (player) {
    //         switch (characteristic) {
    //             case CharacteristicType.Brawn:
    //                 setPlayer(await ActorService.updatePlayer({...player, brawn: value}));
    //                 break;
    //             case CharacteristicType.Agility:
    //                 setPlayer(await ActorService.updatePlayer({...player, agility: value}));
    //                 break;
    //             case CharacteristicType.Intellect:
    //                 setPlayer(await ActorService.updatePlayer({...player, intellect: value}));
    //                 break;
    //             case CharacteristicType.Cunning:
    //                 setPlayer(await ActorService.updatePlayer({...player, cunning: value}));
    //                 break;
    //             case CharacteristicType.Willpower:
    //                 setPlayer(await ActorService.updatePlayer({...player, willpower: value}));
    //                 break;
    //             case CharacteristicType.Presence:
    //                 setPlayer(await ActorService.updatePlayer({...player, presence: value}));
    //                 break;
    //         }
    //     }
    // };

    const handleArchetypeChange = async (value: Archetype) => {
        if (player) {
            setPlayer(await ActorService.updatePlayer({...player, archetype: value}));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={player.name} path={ActorPath.Player + player.id}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        {/*<ViewFieldCard name={'Archetype'} value={player?.archetype?.name!}/>*/}
                        <ArchetypeSelectCard defaultValue={player.archetype} onCommit={handleArchetypeChange}/>
                        <ViewFieldCard name={'Career'} value={player?.career?.name!}/>
                        <ViewFieldCard name={'Encumbrance'} value={String(player.encumbrance)}/>
                    </Grid>
                    <Divider/>
                    <CharacteristicRow actor={player}/>
                    {/*<PlayerCharacteristicRow player={player} handleCharacteristicChange={handleCharacteristicChange}/>*/}
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
