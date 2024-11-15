import Player from "../../../models/actor/player/Player";
import {StatsType} from "../../../models/actor/Stats";
import {Grid} from "@mui/material";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import {DefenseType} from "../../../models/actor/Defense";

interface Props {
    player: Player;
}

export default function DerivedPlayerStatsRow(props: Props) {
    const {player} = props;

    return (
        <Grid container spacing={2}>
            <ViewFieldCard name={'Soak'} value={String(player.soak)}/>
            <ViewFieldCard name={StatsType.Wounds + ' Threshold'} value={String(player.wounds)}/>
            <ViewFieldCard name={StatsType.Strain + ' Threshold'} value={String(player.strain)}/>
            <ViewFieldCard name={DefenseType.Melee} value={String(player.melee)}/>
            <ViewFieldCard name={DefenseType.Ranged} value={String(player.ranged)}/>
        </Grid>
    )
}