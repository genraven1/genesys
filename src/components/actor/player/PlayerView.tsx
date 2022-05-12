import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Player from "../../../models/actor/Player";
import ActorService from "../../../services/ActorService";

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
            setPlayer(playerData)
        })();
    }, [name])

    function getName(player: Player | null): string {
        if (!player) {
            return 'Player Character View'
        }
        return player.name
    }

    return (
        <Card>
            <CardHeader title={getName(player)} />
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                    </Grid>
                    <Divider />
                </Grid>
            </CardContent>
        </Card>
    )
}
