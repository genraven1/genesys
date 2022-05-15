import { Grid, Card, CardHeader, Divider, Typography, CardActions } from "@mui/material";
import { useState } from "react";
import { Characteristic } from "../../models/actor/Characteristics";
import InputNumberRangeSelectField from "../input/InputNumberRangeSelect";

interface Props {
    characteristic: Characteristic,
}

export default function CharacteristicBox(props: Props): JSX.Element {
    const { characteristic } = props;

    const onChange = async (value: number) => {
        characteristic.currentValue = value
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={characteristic.type} style={{ textAlign: 'center' }} />
                <Divider />
                <Typography style={{ textAlign: 'center' }} >{characteristic.currentValue}</Typography>
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={characteristic.currentValue} min={1} max={6} onCommit={(value: number): void => { onChange(value) }} />
                </CardActions>
            </Card>
        </Grid>
    )
}