import Player from "../../models/actor/Player";
import {Grid} from "@mui/material";
import SoakCard from "./SoakCard";
import StatsCard from "./StatsCard";
import Stats, {DefaultStats, StatsType} from "../../models/actor/Stats";


interface Props {
    player: Player
}

export default function PlayerStatsRow(props: Props) {
    const { player } = props

    function getStats(stats: Stats, type: StatsType): Stats {
        if (!stats) {
            return DefaultStats.create(type)
        }
        return stats
    }
    return (
        <Grid container spacing={10}>
            <SoakCard soak={player.soak} />
            <StatsCard stats={getStats(player.wounds, StatsType.Wounds)} />
            <StatsCard stats={getStats(player.strain, StatsType.Strain)} />
        </Grid>
    )
}