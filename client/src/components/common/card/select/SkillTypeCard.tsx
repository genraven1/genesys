import {Card, Grid, MenuItem, Select} from "@mui/material";
import * as React from "react";
import {SkillType} from "../../../../models/actor/Skill";
import CenteredCardHeader from "../CenteredCardHeader";

interface Props {
    value: SkillType
    onChange: (value: SkillType) => void
    disabled: boolean
}

export default function SkillTypeCard(props: Props) {
    const {value, onChange, disabled} = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Skill Type'}/>
                <Select
                    value={value}
                    onChange={(e) => onChange(e.target.value as SkillType)}
                    disabled={disabled}
                    fullWidth
                    label={'Skill Type'}
                >
                    {Object.values(SkillType).map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </Card>
        </Grid>
    )
}