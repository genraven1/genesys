import Actor from "../../../../models/actor/Actor";
import {Grid} from "@mui/material";
import {CharacteristicType} from "../../../../models/actor/Characteristic";
import * as React from "react";
import {useLocation} from "react-router-dom";
import CharacteristicCard from "../../../common/card/CharacteristicCard";
import {ViewFieldCard} from "../../../common/ViewFieldCard";

interface Props {
    actor: Actor
}

export default function CharacteristicRow(props: Props) {
    const {actor} = props;

    return (
        <Grid container spacing={2}>
            <ViewFieldCard name={CharacteristicType.Brawn} value={String(actor.brawn.current)}/>
            <ViewFieldCard name={CharacteristicType.Agility} value={String(actor.agility.current)}/>
            <ViewFieldCard name={CharacteristicType.Intellect} value={String(actor.intellect.current)}/>
            <ViewFieldCard name={CharacteristicType.Cunning} value={String(actor.cunning.current)}/>
            <ViewFieldCard name={CharacteristicType.Willpower} value={String(actor.willpower.current)}/>
            <ViewFieldCard name={CharacteristicType.Presence} value={String(actor.presence.current)}/>
        </Grid>
    );
};

interface PlayerProps {
    actor: Actor
    handleCharacteristicChange: (characteristic: CharacteristicType, value: number) => void
}

export function ActorCharacteristicRow(props: PlayerProps) {
    const {actor, handleCharacteristicChange} = props;
    let pathname = useLocation().pathname;

    return (
        <Grid container spacing={2}>
            <CharacteristicCard type={CharacteristicType.Brawn} value={actor.brawn.current}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Agility} value={actor.agility.current}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Intellect} value={actor.intellect.current}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Cunning} value={actor.cunning.current}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Willpower} value={actor.willpower.current}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
            <CharacteristicCard type={CharacteristicType.Presence} value={actor.presence.current}
                                handleCharacteristicChange={handleCharacteristicChange}
                                disabled={pathname.endsWith('/view')}/>
        </Grid>
    );
};