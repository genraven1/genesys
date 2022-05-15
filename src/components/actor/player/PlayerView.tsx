import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Characteristic } from "../../../models/actor/Characteristics";
import Player from "../../../models/actor/Player";
import ActorService from "../../../services/ActorService";
import CharacteristicRow from "../CharacteristicRow";

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
                    <CharacteristicRow brawn={player!!.brawn} agility={player!!.agility} intellect={player!!.intellect} cunning={player!!.cunning} willpower={player!!.willpower} presence={player!!.presence} />
                    <Divider />
                </Grid>
            </CardContent>
        </Card>
    )
}
