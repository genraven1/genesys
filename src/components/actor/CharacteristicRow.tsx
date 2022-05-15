import { Grid } from "@mui/material";
import { Characteristic } from "../../models/actor/Characteristics"
import CharacteristicCard from "./CharacteristicCard";

interface Props {
    brawn: Characteristic,
    agility: Characteristic,
    intellect: Characteristic,
    cunning: Characteristic,
    willpower: Characteristic,
    presence: Characteristic,
}

export default function CharacteristicRow(props: Props): JSX.Element {
    const { brawn, agility, intellect, cunning, willpower, presence } = props;
    const characteristics = [brawn, agility, intellect, cunning, willpower, presence]

    return (
        <Grid container spacing={10}>
            {characteristics.map((characteristic: Characteristic) => (
                <CharacteristicCard characteristic={characteristic} />
            ))}
        </Grid>
    )
}