import {Activation} from "../../../../models/Talent";
import {Card, CardContent, Grid, MenuItem, Select} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../CenteredCardHeader";

interface Props {
    value: Activation
    onChange: (value: Activation) => void
    disabled: boolean
}

export default function ActivationCard(props: Props) {
    const {value, onChange, disabled} = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Activation'}/>
                <CardContent>
                    <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value as Activation)}
                        disabled={disabled}
                        fullWidth
                        label={'Activation'}
                        variant={"standard"}
                    >
                        {Object.values(Activation).map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </CardContent>
            </Card>
        </Grid>
    )
}