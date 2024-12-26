import Player, {PlayerSkill} from "../../../../models/actor/player/Player";
import {Grid} from "@mui/material";
import {ViewFieldCard} from "../../../common/ViewFieldCard";
import ExperienceCard from "./experience/ExperienceCard";
import * as React from "react";
import ArchetypeSelectCard from "./ArchetypeSelectCard";
import CareerSelectCard from "./CareerSkillCard";
import Archetype from "../../../../models/actor/player/Archetype";
import PlayerService from "../../../../services/actor/PlayerService";
import Career from "../../../../models/actor/player/Career";
import {useLocation} from "react-router-dom";
import CharacteristicRow from "../../actor/common/CharacteristicRow";
import DerivedPlayerStatsRow from "./DerivedPlayerStatsRow";

interface Props {
    player: Player
    updatePlayer: (player: Player) => void
}

export default function PlayerCharacteristicTab(props: Props) {
    const {player, updatePlayer} = props;
    let pathname = useLocation().pathname

    const handleArchetypeChange = async (value: Archetype) => {
        if (player) {
            updatePlayer(await PlayerService.updatePlayerArchetype(player.id, value));
        }
    };

    const handleCareerChange = async (value: Career) => {
        if (player) {
            updatePlayer(await PlayerService.updatePlayerCareer(player.id, value));
        }
    };

    const handleCareerSkillChange = async (value: PlayerSkill[]) => {
        if (player) {
            updatePlayer(await PlayerService.updatePlayerCareerSkills(player.id, value));
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
        <Grid container justifyContent={'center'}>
            <Grid container spacing={2}>
                {renderArchetypeCard()}
                {renderCareerCard()}
                <ViewFieldCard name={'Encumbrance'} value={String(player.encumbrance)}/>
                <ExperienceCard player={player}/>
            </Grid>
            <CharacteristicRow actor={player}/>
            <DerivedPlayerStatsRow player={player}/>
        </Grid>
    )
}