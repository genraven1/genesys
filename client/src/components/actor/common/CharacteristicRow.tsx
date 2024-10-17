import Actor from "../../../models/actor/Actor";
import {Grid} from "@mui/material";
import {CharacteristicType} from "../../../models/character/Characteristic";
import * as React from "react";
import {ViewCharacteristicCard} from "../CharacteristicCard";
import Player from "../../../models/actor/player/Player";
import {CharacteristicCard} from "../../common/ViewFieldCard";
import {useLocation} from "react-router-dom";

interface Props {
    actor: Actor
}

export default function CharacteristicRow(props: Props) {
    const {actor} = props

    return (
        <Grid container spacing={2}>
            <ViewCharacteristicCard characteristic={actor?.brawn!!} type={CharacteristicType.Brawn}/>
            <ViewCharacteristicCard characteristic={actor?.agility!!} type={CharacteristicType.Agility}/>
            <ViewCharacteristicCard characteristic={actor?.intellect!!} type={CharacteristicType.Intellect}/>
            <ViewCharacteristicCard characteristic={actor?.cunning!!} type={CharacteristicType.Cunning}/>
            <ViewCharacteristicCard characteristic={actor?.willpower!!} type={CharacteristicType.Willpower}/>
            <ViewCharacteristicCard characteristic={actor?.presence!!} type={CharacteristicType.Presence}/>
        </Grid>
    )
}

interface PlayerProps {
    player: Player
    handleCharacteristicChange: (characteristic: CharacteristicType, value: number) => void
}

export function PlayerCharacteristicRow(props: PlayerProps) {
    const {player, handleCharacteristicChange} = props;
    let pathname = useLocation().pathname;

    return (
        <Grid container spacing={2}>
            <CharacteristicCard type={CharacteristicType.Brawn} value={player.brawn}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Agility} value={player.agility}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Intellect} value={player.intellect}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Cunning} value={player.cunning}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Willpower} value={player.willpower}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Presence} value={player.presence}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
        </Grid>
    )
}