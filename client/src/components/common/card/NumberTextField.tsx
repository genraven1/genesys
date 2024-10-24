import {Card, CardContent, Grid, TextField} from "@mui/material";
import CenteredCardHeader from "./CenteredCardHeader";
import * as React from "react";

interface Props {
    title: string
    value: number
    onChange: (value: number) => void
    min: number
    max: number
    disabled: boolean
    steps?: number
}

export function NumberTextFieldCard(props: Props) {
    const {title, value, onChange, min, max, disabled, steps} = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardContent>
                    <TextField
                        type="number"
                        value={value}
                        label={title}
                        fullWidth
                        onChange={(e) => onChange(Number(e.target.value))}
                        inputProps={{min: min, max: max, step: steps}}
                        disabled={disabled}
                    />
                </CardContent>
            </Card>
        </Grid>
    )
}