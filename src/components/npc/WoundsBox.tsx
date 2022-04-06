import { Grid, Card, CardHeader, Divider, TextField, CardActions, Typography } from "@mui/material";
import { useState } from "react";
import { Wounds, DefaultWounds } from "../../models/Actor";
import InputButtonGroup from "../input/InputButtonGroup";

export interface CreateWoundsProps {
    newWounds: Wounds,
    onWoundsUpdate: (wounds: Wounds) => void;
}

export function CreateWoundsBox(props: CreateWoundsProps): JSX.Element {
    const { newWounds, onWoundsUpdate } = props;
    const [wounds, setWounds] = useState(newWounds ?? DefaultWounds.create());

    const handleOnDecrease = () => {
        setWounds((prev_state) => ({
            ...prev_state,
            maxValue: wounds.maxValue--,
        }));
        onWoundsUpdate(wounds);
    }

    const handleOnIncrease = () => {
        setWounds((prev_state) => ({
            ...prev_state,
            maxValue: wounds.maxValue++,
        }));
        onWoundsUpdate(wounds);
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