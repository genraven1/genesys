import {Experience} from "../../../../models/actor/player/Player";
import {Card, CardContent, Grid} from "@mui/material";
import {ViewFieldCard} from "../../../common/ViewFieldCard";
import * as React from "react";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";

interface Props {
    experience: Experience
}

export default function ExperienceCard(props: Props) {
    const {experience} = props;

    return (
        <Grid item xs>
            <Grid container spacing={2}>
                <Grid item xs>
                    <Card>
                        <CenteredCardHeader title={'Available'}/>
                        <CardContent>
                            <GenesysDescriptionTypography text={String(experience.available)}/>
                        </CardContent>
                    </Card>
                </Grid>
                <ViewFieldCard name={'Total'} value={String(experience.total)}/>
            </Grid>
        </Grid>
    )
}