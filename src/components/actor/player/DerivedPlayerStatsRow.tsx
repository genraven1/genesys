import Player from "../../../models/actor/player/Player";
import PlayerSoakCard from "./PlayerSoakCard";
import {ViewStatsCard} from "../StatsCard";
import {StatsType} from "../../../models/actor/Stats";
import PlayerDefenseCard from "./PlayerDefenseCard";
import {Grid} from "@mui/material";

interface Props {
    player: Player;
}

export default function DerivedPlayerStatsRow(props: Props) {
    const { player } = props;

    return (
        <Grid container spacing={2}>
            <PlayerSoakCard player={player}/>
            <ViewStatsCard stats={player.wounds} type={StatsType.Wounds}/>
            <ViewStatsCard stats={player.strain} type={StatsType.Strain}/>
            <PlayerDefenseCard player={player}/>
        </Grid>
    )
}