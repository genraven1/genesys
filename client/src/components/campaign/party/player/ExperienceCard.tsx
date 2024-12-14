import {Experience} from "../../../../models/actor/player/Player";
import {Grid} from "@mui/material";
import {ViewFieldCard} from "../../../common/ViewFieldCard";
import * as React from "react";

interface Props {
    experience: Experience
}

export default function ExperienceCard(props: Props) {
    const {experience} = props;

    return (
        <Grid item xs>
            <Grid container spacing={2}>
                <ViewFieldCard name={'Available'} value={String(experience.available)}/>
                <ViewFieldCard name={'Total'} value={String(experience.total)}/>
            </Grid>
        </Grid>
    )
}