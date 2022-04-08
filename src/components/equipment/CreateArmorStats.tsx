import { Grid, Card, CardHeader, Divider, CardActions, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import Armor from "../../models/equipment/Armor";
import InputButtonGroup from "../input/InputButtonGroup";

interface Props {
    newArmor: Armor,
    onArmorUpdate: (armor: Armor) => Armor,
}

export default function CreateArmorStats(props: Props): JSX.Element {
    const { newArmor, onArmorUpdate } = props;
    const [armor, setArmor] = useState<Armor>(newArmor);

    const handleEncumbranceDecrease = () => {
        setArmor((prev_state) => ({
            ...prev_state,
            encumbrance: armor.encumbrance--,
        }));
        setArmor(onArmorUpdate(armor));
    }

    const handleEncumbranceIncrease = () => {
        setArmor((prev_state) => ({
            ...prev_state,
            encumbrance: armor.encumbrance++,
        }));
        setArmor(onArmorUpdate(armor));
    }

    return (
        <Fragment>
            <Grid item xs>
                <Card>
                    <CardHeader title={'Encumbrance'} style={{ textAlign: 'center' }} />
                    <Divider />
                    <Typography style={{ textAlign: 'center' }} >{armor.encumbrance}</Typography>
                    <CardActions>
                        <InputButtonGroup onIncrease={handleEncumbranceIncrease} onDecrease={handleEncumbranceDecrease} />
                    </CardActions>
                </Card>
            </Grid>
        </Fragment>
    )
}