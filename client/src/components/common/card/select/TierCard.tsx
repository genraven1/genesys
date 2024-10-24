import {Tier} from "../../../../models/Talent";
import {Card, CardContent, Grid, MenuItem, Select} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../CenteredCardHeader";

interface Props {
    value: Tier
    onChange: (value: Tier) => void
    disabled: boolean
}

export default function TierCard(props: Props) {
    const {value, onChange, disabled} = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Tier'}/>
                <CardContent>
                    <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value as Tier)}
                        disabled={disabled}
                        fullWidth
                        label={'Tier'}
                    >
                        {Object.values(Tier).map(option => (
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