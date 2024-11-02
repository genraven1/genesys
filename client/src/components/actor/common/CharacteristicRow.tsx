import Actor from "../../../models/actor/Actor";
import {Grid} from "@mui/material";
import {CharacteristicType} from "../../../models/character/Characteristic";
import * as React from "react";
import Player from "../../../models/actor/player/Player";
import {useLocation} from "react-router-dom";
import CharacteristicCard from "../../common/card/CharacteristicCard";
import {ViewCharacteristicCard} from "../CharacteristicCard";

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
    actor: Actor
    handleCharacteristicChange: (characteristic: CharacteristicType, value: number) => void
}

export function ActorCharacteristicRow(props: PlayerProps) {
    const {actor, handleCharacteristicChange} = props;
    let pathname = useLocation().pathname;

    return (
        <Grid container spacing={2}>
            <CharacteristicCard type={CharacteristicType.Brawn} value={actor.brawn}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Agility} value={actor.agility}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Intellect} value={actor.intellect}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Cunning} value={actor.cunning}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Willpower} value={actor.willpower}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Presence} value={actor.presence}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
        </Grid>
    )
}