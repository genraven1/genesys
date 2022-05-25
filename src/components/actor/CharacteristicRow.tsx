import {Grid} from "@mui/material";
import {CharacteristicType} from "../../models/actor/Characteristics"
import CharacteristicCard from "./CharacteristicCard";
import Actor from "../../models/actor/Actor";

interface Props {
    actor: Actor,
}

export default function CharacteristicRow(props: Props): JSX.Element {
    const { actor } = props;

    return (
        <Grid container spacing={10}>
            <CharacteristicCard characteristic={actor.brawn}  type={CharacteristicType.Brawn}/>
            <CharacteristicCard characteristic={actor.agility}  type={CharacteristicType.Agility}/>
            <CharacteristicCard characteristic={actor.intellect}  type={CharacteristicType.Intellect}/>
            <CharacteristicCard characteristic={actor.cunning}  type={CharacteristicType.Cunning}/>
            <CharacteristicCard characteristic={actor.willpower}  type={CharacteristicType.Willpower}/>
            <CharacteristicCard characteristic={actor.presence}  type={CharacteristicType.Presence}/>
        </Grid>
    )
}