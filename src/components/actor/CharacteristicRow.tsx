import {Grid} from "@mui/material";
import {CharacteristicType} from "../../models/actor/Characteristics"
import CharacteristicCard from "./CharacteristicCard";
import Actor from "../../models/actor/Actor";

interface Props {
    actor: Actor,
    onChange: (value: number) => void,
}

export default function CharacteristicRow(props: Props): JSX.Element {
    const { actor, onChange } = props;

    return (
        <Grid container spacing={10}>
            <CharacteristicCard characteristic={actor.brawn}  type={CharacteristicType.Brawn} onChange={(value: number): void => { onChange(value) }}/>
            <CharacteristicCard characteristic={actor.agility}  type={CharacteristicType.Agility} onChange={(value: number): void => { onChange(value) }}/>
            <CharacteristicCard characteristic={actor.intellect}  type={CharacteristicType.Intellect} onChange={(value: number): void => { onChange(value) }}/>
            <CharacteristicCard characteristic={actor.cunning}  type={CharacteristicType.Cunning} onChange={(value: number): void => { onChange(value) }}/>
            <CharacteristicCard characteristic={actor.willpower}  type={CharacteristicType.Willpower} onChange={(value: number): void => { onChange(value) }}/>
            <CharacteristicCard characteristic={actor.presence}  type={CharacteristicType.Presence} onChange={(value: number): void => { onChange(value) }}/>
        </Grid>
    )
}