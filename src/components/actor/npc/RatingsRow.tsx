import {Grid} from "@mui/material";
import NonPlayerCharacter, {RatingType} from "../../../models/actor/npc/NonPlayerCharacter";
import RatingCard from "./RatingCard";

interface Props {
    npc: NonPlayerCharacter,
}

export default function RatingsRow(props: Props): JSX.Element {
    const { npc } = props;

    return (
        <Grid container spacing={10}>
            <RatingCard  rating={npc.combat} type={RatingType.Combat}/>
            <RatingCard  rating={npc.social} type={RatingType.Social}/>
            <RatingCard  rating={npc.general} type={RatingType.General}/>
        </Grid>
    )
}