import {Card, CardContent, CardHeader, Divider, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Player, {DefaultPlayer} from "../../../models/actor/player/Player";
import ActorService from "../../../services/ActorService";
import CharacteristicRow from "../CharacteristicRow";
import PlayerStatsRow from "../PlayerStatsRow";
import {Characteristic, CharacteristicType} from "../../../models/actor/Characteristics";
import Stats, {StatsType} from "../../../models/actor/Stats";
import {Defense, DefenseType} from "../../../models/actor/Defense";

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

    const onStatChange = (copyPlayer: Player, value: Stats, type: StatsType) => {
        if (type === StatsType.Wounds) {
            copyPlayer.wounds = value
        }
        else if (type === StatsType.Strain) {
            copyPlayer.strain = value
        }
    }

    const onDefenseChange = (copyPlayer: Player, value: Defense, type: DefenseType) => {
        if (type === DefenseType.Melee) {
            copyPlayer.melee = value
        }
        else if (type === DefenseType.Ranged) {
            copyPlayer.ranged = value
        }
    }

    const onChange = async (key: keyof Player, value: any) => {
        if (value === null || (player !== null && player[key] === value)) {
            return;
        }
        const copyPlayer = {...player} as Player
        switch (key) {
            case "brawn":
                onCharacteristicChange(copyPlayer, value, CharacteristicType.Brawn)
                break;
            case "agility":
                onCharacteristicChange(copyPlayer, value, CharacteristicType.Agility)
                break;
            case "intellect":
                onCharacteristicChange(copyPlayer, value, CharacteristicType.Intellect)
                break;
            case "cunning":
                onCharacteristicChange(copyPlayer, value, CharacteristicType.Cunning)
                break;
            case "willpower":
                onCharacteristicChange(copyPlayer, value, CharacteristicType.Willpower)
                break;
            case "presence":
                onCharacteristicChange(copyPlayer, value, CharacteristicType.Presence)
                break;
            case 'talents':
                break
            case "soak":
                copyPlayer.soak = copyPlayer.brawn.current
                break;
            case "melee":
                onDefenseChange(copyPlayer, value, DefenseType.Melee)
                break;
            case "ranged":
                onDefenseChange(copyPlayer, value, DefenseType.Ranged)
                break;
            case "wounds":
                onStatChange(copyPlayer, value, StatsType.Wounds)
                break;
            case "strain":
                onStatChange(copyPlayer, value, StatsType.Strain)
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
