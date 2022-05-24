import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Player, {DefaultPlayer} from "../../../models/actor/Player";
import ActorService from "../../../services/ActorService";
import CharacteristicRow from "../CharacteristicRow";
import StatsCard from "../StatsCard";
import Stats from "../../../models/actor/Stats";
import PlayerStatsRow from "../PlayerStatsRow";

export default function PlayerView() {
    const { name } = useParams<{ name: string }>();
    const [player, setPlayer] = useState<Player | null>(null);
    const [errors, setErrors] = useState({} as any);

    useEffect(() => {
        if (!name) {
            return;
        }
        (async (): Promise<void> => {
            const playerData = await ActorService.getPlayer(name);
            setPlayer(playerData);
        })();
    }, [name])

    function getName(player: Player | null): string {
        if (!player) {
            return 'Player Character View'
        }
        return player.name
    }

    function getPlayer(player: Player | null): Player {
        if (!player) {
            return DefaultPlayer.create();
        }
        return player
    }

    return (
        <Card>
            <CardHeader title={getName(player)} />
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <CharacteristicRow actor={getPlayer(player)} />
                    <Divider />
                    <PlayerStatsRow player={getPlayer(player)} />
                </Grid>
            </CardContent>
        </Card>
    )
}
