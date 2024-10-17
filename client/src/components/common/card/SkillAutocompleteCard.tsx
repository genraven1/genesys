import Skill from "../../../models/actor/Skill";
import {Autocomplete, Card, CardContent, Grid, TextField} from "@mui/material";
import CenteredCardHeader from "./CenteredCardHeader";
import {renderSkillName} from "../skill/SkillRenders";
import * as React from "react";

interface SkillAutoCompleteProps {
    disabled: boolean
    handleSkillChange: (newValue: Skill) => void
    skills: Skill[]
    startingSkill: Skill
}

export default function SkillAutocompleteCard(props: SkillAutoCompleteProps) {
    const {handleSkillChange, disabled, startingSkill, skills} = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Skill'}/>
                <CardContent>
                    <Autocomplete
                        options={skills}
                        getOptionLabel={(option) => renderSkillName(option)}
                        value={startingSkill}
                        fullWidth
                        onChange={(e, newValue) => handleSkillChange(newValue as Skill)}
                        renderInput={(params) => <TextField {...params} label='Skill'
                                                            variant="outlined"/>}
                        disabled={disabled}
                    />
                </CardContent>
            </Card>
        </Grid>
    )
}