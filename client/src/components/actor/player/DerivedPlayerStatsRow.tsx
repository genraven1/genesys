import Player from "../../../models/actor/player/Player";
import {StatsType} from "../../../models/actor/Stats";
import PlayerDefenseCard from "./PlayerDefenseCard";
import {Grid} from "@mui/material";
import {ViewFieldCard} from "../../common/ViewFieldCard";

interface Props {
    player: Player;
}

export default function DerivedPlayerStatsRow(props: Props) {
    const { player } = props;

    return (
        <Grid container spacing={2}>
            <ViewFieldCard name={'Soak'} value={String(player.soak)}/>
            <ViewFieldCard name={StatsType.Wounds + ' Threshold'} value={String(player.wounds)}/>
            <ViewFieldCard name={StatsType.Strain + ' Threshold'} value={String(player.strain)}/>
            <PlayerDefenseCard player={player}/>
        </Grid>
    )
}