import {Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import * as React from "react";
import SkillAutocompleteCard from "../../common/card/SkillAutocompleteCard";
import Talent from "../../../models/Talent";
import {useFetchAllSkills} from "../../skills/SkillWorkflow";
import Skill from "../../../models/actor/Skill";
import {ActorSkill} from "../../../models/actor/Actor";
import DifficultyCard from "../../common/card/select/DifficultyCard";
import {Difficulty} from "../../../models/common/Difficulty";

interface Props {
    talent: Talent
    updateTalent: (talent: Talent) => void
    disabled: boolean
}

export default function TalentSkillCheckCard(props: Props) {
    const {talent, updateTalent, disabled} = props;

    const handleSkillChange = (value: Skill) => {
        updateTalent({...talent, talentSkillCheck: {...talent.talentSkillCheck, skill: value as ActorSkill}});
    };

    const handleDifficultyChange = (value: Difficulty) => {
        updateTalent({...talent, talentSkillCheck: {...talent.talentSkillCheck, difficulty: value}});
    };

    return (
        <Card sx={{width: 1}}>
            <CenteredCardHeader title={'Skill Check'}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <SkillAutocompleteCard disabled={disabled} handleSkillChange={handleSkillChange}
                                           skills={useFetchAllSkills()} startingSkill={talent.talentSkillCheck.skill}/>
                    <DifficultyCard value={talent.talentSkillCheck.difficulty} onChange={handleDifficultyChange} disabled={disabled}/>
                </Grid>
            </CardContent>
        </Card>
    );
}