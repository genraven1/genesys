import { Grid, Card, CardHeader, Divider, CardActions, Typography } from "@mui/material";
import { useState } from "react";
import { Wounds } from "../../models/Actor";
import InputButtonGroup from "../input/InputButtonGroup";

interface CreateWoundsProps {
    newWounds: Wounds,
    onWoundsUpdate: (wounds: Wounds) => Wounds;
}

export default function CreateWoundsBox(props: CreateWoundsProps): JSX.Element {
    const { newWounds, onWoundsUpdate } = props;
    const [wounds, setWounds] = useState<Wounds>(newWounds);

    const handleOnDecrease = () => {
        setWounds((prev_state) => ({
            ...prev_state,
            maxValue: wounds.maxValue--,
        }));
        setWounds(onWoundsUpdate(wounds));
    }

    const handleOnIncrease = () => {
        setWounds((prev_state) => ({
            ...prev_state,
            maxValue: wounds.maxValue++,
        }));
        setWounds(onWoundsUpdate(wounds));
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={'Wounds'} style={{ textAlign: 'center' }} />
                <Divider />
                <Typography style={{ textAlign: 'center' }} >{wounds.maxValue}</Typography>
                <CardActions>
                    <InputButtonGroup onIncrease={handleOnIncrease} onDecrease={handleOnDecrease} />
                </CardActions>
            </Card>
        </Grid>
    )
}