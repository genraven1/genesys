import {Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import CenteredCardHeader from "./CenteredCardHeader";
import * as React from "react";

interface BooleanTextFieldProps {
    title: string;
    value: boolean;
    disabled: boolean;
    onChange: (value: boolean) => void
}

export function BooleanTextFieldCard(props: BooleanTextFieldProps) {
    const {title, value, disabled, onChange} = props
    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardContent>
                    <FormControl fullWidth>
                        <InputLabel>{title}</InputLabel>
                        <Select
                            value={value ? 'Yes' : 'No'}
                            onChange={(e) => onChange(e.target.value === 'Yes')}
                            label="Ranked"
                            disabled={disabled}
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
        </Grid>
    )
}