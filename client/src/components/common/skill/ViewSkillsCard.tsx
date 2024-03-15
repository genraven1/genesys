import {Card, CardContent} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../card/CenteredCardHeader";
import Skill from "../../../models/actor/Skill";
import {renderSkills} from "./SkillRenders";
import {useFetchCurrentSettingSkills} from "../../skills/SkillWorkflow";

interface Props {
    skills: Skill[]
}

export default function ViewSkillsCard(props: Props): JSX.Element {
    const {skills} = props

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Career Skills'}/>
            <CardContent>
                {renderSkills(skills, useFetchCurrentSettingSkills())}
            </CardContent>
        </Card>
    )
}