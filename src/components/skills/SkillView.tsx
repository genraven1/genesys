import Skill from "../../models/actor/Skill";
import {Card, CardContent, Divider, Grid} from "@mui/material";
import {ViewFieldCard} from "../common/ViewFieldCard";
import {Path} from "../../services/Path";
import * as React from "react";
import {CommonCardHeader} from "../common/CommonCardHeader";


export default function SkillView(props: {skill: Skill}): JSX.Element {
    const {skill} = props

    const renderSkillActiveCard = (): JSX.Element => {
        if (skill?.active!!) {
            return <ViewFieldCard name={'Active Skill'} value={'True'} />
        }
        else {
            return <ViewFieldCard name={'Active Skill'} value={'False'} />
        }
    }

    return (
        <Card>
            <CommonCardHeader path={Path.Skills}/>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <ViewFieldCard name={'Skill Type'} value={skill?.type!!} />
                    <ViewFieldCard name={'Linked Characteristic'} value={skill?.characteristic!!} />
                    {renderSkillActiveCard()}
                </Grid>
            </CardContent>
        </Card>
    )
}