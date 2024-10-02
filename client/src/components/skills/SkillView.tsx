import Skill from "../../models/actor/Skill";
import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import {ViewFieldCard} from "../common/ViewFieldCard";
import * as React from "react";

interface Props {
    skill: Skill
}

export default function SkillView(props: Props) {
    const {skill} = props;

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={skill.name}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <ViewFieldCard name={'Skill Type'} value={skill.type} />
                    <ViewFieldCard name={'Characteristic'} value={skill.characteristic} />
                </Grid>
            </CardContent>
        </Card>
    );
}