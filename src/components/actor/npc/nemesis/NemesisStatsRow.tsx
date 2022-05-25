import {Grid} from "@mui/material";
import Nemesis from "../../../../models/actor/npc/Nemesis";
import StatsCard from "../../StatsCard";
import TotalDefenseCard from "../../TotalDefenseCard";
import SoakCard from "../../SoakCard";
import {StatsType} from "../../../../models/actor/Stats";

interface Props {
    nemesis: Nemesis
}

export default function NemesisStatsRow(props: Props) {
    const { nemesis } = props

    return (
        <Grid container spacing={10}>
            <SoakCard soak={nemesis.soak} />
            <StatsCard stats={nemesis.wounds} type={StatsType.Wounds}/>
            <StatsCard stats={nemesis.strain} type={StatsType.Strain} />
            <TotalDefenseCard melee={nemesis.melee} ranged={nemesis.ranged} />
        </Grid>
    )
}