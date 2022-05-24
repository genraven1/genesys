import { Grid } from "@mui/material";
import { Characteristic } from "../../models/actor/Characteristics"
import CharacteristicCard from "./CharacteristicCard";
import Actor from "../../models/actor/Actor";

interface Props {
    actor: Actor,
}

export default function CharacteristicRow(props: Props): JSX.Element {
    const { actor } = props;
    const characteristics = [actor.brawn, actor.agility, actor.intellect, actor.cunning, actor.willpower, actor.presence]

    return (
        <Grid container spacing={10}>
            {characteristics.map((characteristic: Characteristic) => (
                <CharacteristicCard characteristic={characteristic} />
            ))}
        </Grid>
    )
}