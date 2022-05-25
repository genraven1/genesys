import {Card, CardContent, CardHeader, Divider, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Player, {DefaultPlayer} from "../../../models/actor/Player";
import ActorService from "../../../services/ActorService";
import CharacteristicRow from "../CharacteristicRow";
import PlayerStatsRow from "../PlayerStatsRow";
import {Characteristic, CharacteristicType} from "../../../models/actor/Characteristics";

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

    const onCharacteristicChange = (copyPlayer: Player, value: Characteristic, type: CharacteristicType) => {
        if (type === CharacteristicType.Brawn) {
            copyPlayer.brawn = value
        }
        else if(type === CharacteristicType.Agility) {
            copyPlayer.agility = value
        }
        else if(type === CharacteristicType.Intellect) {
            copyPlayer.intellect = value
        }
        else if(type === CharacteristicType.Cunning) {
            copyPlayer.cunning = value
        }
        else if(type === CharacteristicType.Willpower) {
            copyPlayer.willpower = value
        }
        else if(type === CharacteristicType.Presence) {
            copyPlayer.presence = value
        }
    }

    const onChange = async (key: keyof Player, value: any, type: CharacteristicType) => {
        if (value === null || (player !== null && player[key] === type)) {
            return;
        }
        const copyPlayer = {...player} as Player
        switch (key) {
            case "strain":
                break;
            case "brawn":
            case "agility":
            case "intellect":
            case "cunning":
            case "willpower":
            case "presence":
                onCharacteristicChange(copyPlayer, value, type)
                break;
            case 'talents':
            case "soak":
                break;
            case "melee":
            case "ranged":
                break;
            case "wounds":
                break;
            case "name":
                copyPlayer.name = value
        }

        await updatePlayer(copyPlayer)
    }

    const updatePlayer = async (copyPlayer: Player) => {
        setPlayer(copyPlayer)

        await ActorService.updatePlayer(copyPlayer.name, copyPlayer)
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
