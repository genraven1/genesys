import Player from "../../../../../models/actor/player/Player";
import {Card, CardContent, Grid} from "@mui/material";
import {ViewFieldCard} from "../../../../common/ViewFieldCard";
import * as React from "react";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
import SpendExperienceMenuButton from "./SpendExperienceMenuButton";

interface Props {
    player: Player
}

export default function ExperienceCard(props: Props) {
    const {player} = props;

    // const handleSpendExperience = () => {
    //
    // };

    return (
        <Grid item xs>
            <Grid container spacing={2}>
                <Grid item xs>
                    <Card>
                        <CenteredCardHeader title={'Available'}/>
                        <CardContent>
                            <Grid container justifyContent={"center"}>
                                <SpendExperienceMenuButton player={player}/>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <ViewFieldCard name={'Total'} value={String(player.experience.total)}/>
            </Grid>
        </Grid>
    )
}