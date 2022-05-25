import Player from "../../models/actor/player/Player";
import {Grid} from "@mui/material";
import SoakCard from "./SoakCard";
import StatsCard from "./StatsCard";
import {StatsType} from "../../models/actor/Stats";
import TotalDefenseCard from "./TotalDefenseCard";

interface Props {
    player: Player
}

export default function PlayerStatsRow(props: Props) {
    const { player } = props

    return (
        <Grid container spacing={10}>
            <SoakCard soak={player.soak} />
            <StatsCard stats={player.wounds}  type={ StatsType.Wounds}/>
            <StatsCard stats={player.strain} type={StatsType.Strain} />
            <TotalDefenseCard melee={player.melee} ranged={player.ranged} />
        </Grid>
    )
}