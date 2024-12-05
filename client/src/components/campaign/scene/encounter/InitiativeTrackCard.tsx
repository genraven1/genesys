import {Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import * as React from "react";
import NonPlayerCharacterInitiativeCard from "./NonPlayerCharacterInitiativeCard";

interface Props {
    npcs: SingleNonPlayerCharacter[]
}

export default function InitiativeTrackCard(props: Props) {
    const {npcs} = props;

    return (
        <Card>
            <CenteredCardHeader title={'Initiative'}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    {npcs.map((npc, index) => (
                        <NonPlayerCharacterInitiativeCard npc={npc}/>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}