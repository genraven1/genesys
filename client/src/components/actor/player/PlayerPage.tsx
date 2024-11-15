import {Card, CardContent, Divider, Grid} from '@mui/material';
import {useLocation, useParams} from 'react-router-dom';
import Player, {PlayerSkill} from '../../../models/actor/player/Player';
import CharacteristicRow from "../../campaign/actor/common/CharacteristicRow";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import {Fragment, useEffect, useState} from "react";
import Career from "../../../models/actor/player/Career";
import * as React from "react";
import ActorService from "../../../services/ActorService";
import CenteredCardHeaderWithAction from "../../common/card/CenteredCardHeaderWithAction";
import Archetype from "../../../models/actor/player/Archetype";
import {ActorPath} from "../../../services/RootPath";
import ArchetypeSelectCard from "./ArchetypeSelectCard";
import CareerSelectCard from "./CareerSkillCard";
import DerivedPlayerStatsRow from "./DerivedPlayerStatsRow";
import PlayerSkillCard from "./skill/PlayerSkillCard";
import EquipmentCard from "../../campaign/actor/equipment/EquipmentCard";
import {ActorArmor} from "../../../models/equipment/Armor";
import {ActorWeapon} from "../../../models/equipment/Weapon";
import SingleNonPlayerCharacterTalentCard from "../../campaign/npc/talent/SingleNonPlayerCharacterTalentCard";
import {ActorTalent} from "../../../models/Talent";

export default function PlayerPage() {
    const {id} = useParams<{ id: string }>();
    const [player, setPlayer] = useState<Player | null>(null);
    let pathname = useLocation().pathname

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
            setPlayer(await ActorService.updatePlayerArchetype(player.id, value));
        }
    };

    const handleCareerChange = async (value: Career) => {
        if (player) {
            setPlayer(await ActorService.updatePlayerCareer(player.id, value));
        }
    };

    const handleCareerSkillChange = async (value: PlayerSkill[]) => {
        if (player) {
            setPlayer(await ActorService.updatePlayerCareerSkills(player.id, value));
        }
    };

    const handleArmorChange = async (value: ActorArmor[]) => {
        if (player) {
            setPlayer(await ActorService.updatePlayer({...player, armors: value}));
        }
    };

    const handleWeaponChange = async (value: ActorWeapon[]) => {
        if (player) {
            setPlayer(await ActorService.updatePlayer({...player, weapons: value}));
        }
    };

    const handleTalentChange = async (values: ActorTalent[]) => {
        if (player) {
            setPlayer(await ActorService.updatePlayer({...player, talents: values}));
        }
    };

    const renderArchetypeCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Archetype"} value={player.archetype.name}/> :
            <ArchetypeSelectCard archetype={player.archetype} onCommit={handleArchetypeChange}/>;
    };

    const renderCareerCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Career"} value={player.career.name}/> :
            <CareerSelectCard player={player} onCommit={handleCareerChange} onSkillSelect={handleCareerSkillChange}/>;
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={player.name} path={ActorPath.Player + player.id}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        {renderArchetypeCard()}
                        {renderCareerCard()}
                        <ViewFieldCard name={'Encumbrance'} value={String(player.encumbrance)}/>
                    </Grid>
                    <Divider/>
                    <CharacteristicRow actor={player}/>
                    <Divider/>
                    <DerivedPlayerStatsRow player={player}/>
                    <Divider/>
                    <PlayerSkillCard player={player}/>
                    <Divider/>
                    <EquipmentCard actor={player} updateArmors={handleArmorChange} updateWeapons={handleWeaponChange}/>
                    <Divider/>
                    <SingleNonPlayerCharacterTalentCard talents={player.talents} updateTalents={handleTalentChange}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
