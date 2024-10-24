import {Difficulty} from "../../../../models/common/Difficulty";
import {Card, CardContent, Grid, MenuItem, Select} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../CenteredCardHeader";

interface Props {
    value: Difficulty
    onChange: (value: Difficulty) => void
    disabled: boolean
}

export default function DifficultyCard(props: Props) {
    const {value, onChange, disabled} = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Difficulty'}/>
                <CardContent>
                    <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value as Difficulty)}
                        disabled={disabled}
                        fullWidth
                        label={'Difficulty'}
                    >
                        {Object.values(Difficulty).map(option => (
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