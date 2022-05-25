import {Card, CardContent, CardHeader, Divider, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import Nemesis, {DefaultNemesis} from "../../../../models/actor/npc/Nemesis";
import {Characteristic, CharacteristicType} from "../../../../models/actor/Characteristics";
import {Defense, DefenseType} from "../../../../models/actor/Defense";
import Stats, {StatsType} from "../../../../models/actor/Stats";
import CharacteristicRow from "../../CharacteristicRow";
import RatingsRow from "../RatingsRow";
import NemesisStatsRow from "./NemesisStatsRow";

export default function NemesisView() {
    const { name } = useParams<{ name: string }>();
    const [nemesis, setNemesis] = useState<Nemesis | null>(null);
    const [errors, setErrors] = useState({} as any);

    useEffect(() => {
        if (!name) {
            return;
        }
        (async (): Promise<void> => {
            const nemesisData = await ActorService.getNemesis(name);
            setNemesis(nemesisData);
        })();
    }, [name])

    function getName(nemesis: Nemesis | null): string {
        if (!nemesis) {
            return 'Nemesis View'
        }
        return nemesis.name
    }

    function getNemesis(nemesis: Nemesis | null): Nemesis {
        if (!nemesis) {
            return DefaultNemesis.create();
        }
        return nemesis
    }

    const onCharacteristicChange = (copyNemesis: Nemesis, value: Characteristic, type: CharacteristicType) => {
        if (type === CharacteristicType.Brawn) {
            copyNemesis.brawn = value
        }
        else if(type === CharacteristicType.Agility) {
            copyNemesis.agility = value
        }
        else if(type === CharacteristicType.Intellect) {
            copyNemesis.intellect = value
        }
        else if(type === CharacteristicType.Cunning) {
            copyNemesis.cunning = value
        }
        else if(type === CharacteristicType.Willpower) {
            copyNemesis.willpower = value
        }
        else if(type === CharacteristicType.Presence) {
            copyNemesis.presence = value
        }
    }

    const onStatChange = (copyNemesis: Nemesis, value: Stats, type: StatsType) => {
        if (type === StatsType.Wounds) {
            copyNemesis.wounds = value
        }
        else if (type === StatsType.Strain) {
            copyNemesis.strain = value
        }
    }

    const onDefenseChange = (copyNemesis: Nemesis, value: Defense, type: DefenseType) => {
        if (type === DefenseType.Melee) {
            copyNemesis.melee = value
        }
        else if (type === DefenseType.Ranged) {
            copyNemesis.ranged = value
        }
    }

    const onChange = async (key: keyof Nemesis, value: any) => {
        if (value === null || (nemesis !== null && nemesis[key] === value)) {
            return;
        }
        const copyNemesis = {...nemesis} as Nemesis
        switch (key) {
            case "brawn":
                onCharacteristicChange(copyNemesis, value, CharacteristicType.Brawn)
                break;
            case "agility":
                onCharacteristicChange(copyNemesis, value, CharacteristicType.Agility)
                break;
            case "intellect":
                onCharacteristicChange(copyNemesis, value, CharacteristicType.Intellect)
                break;
            case "cunning":
                onCharacteristicChange(copyNemesis, value, CharacteristicType.Cunning)
                break;
            case "willpower":
                onCharacteristicChange(copyNemesis, value, CharacteristicType.Willpower)
                break;
            case "presence":
                onCharacteristicChange(copyNemesis, value, CharacteristicType.Presence)
                break;
            case 'talents':
                break
            case "soak":
                copyNemesis.soak = copyNemesis.brawn.current
                break;
            case "melee":
                onDefenseChange(copyNemesis, value, DefenseType.Melee)
                break;
            case "ranged":
                onDefenseChange(copyNemesis, value, DefenseType.Ranged)
                break;
            case "wounds":
                onStatChange(copyNemesis, value, StatsType.Wounds)
                break;
            case "strain":
                onStatChange(copyNemesis, value, StatsType.Strain)
                break;
            case "name":
                copyNemesis.name = value
        }

        await updateNemesis(copyNemesis)
    }

    const updateNemesis = async (copyNemesis: Nemesis) => {
        setNemesis(copyNemesis)

        await ActorService.updateNemesis(copyNemesis.name, copyNemesis)
    }

    return (
        <Card>
            <CardHeader title={getName(nemesis)} />
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <CharacteristicRow actor={getNemesis(nemesis)} />
                    <Divider />
                    <NemesisStatsRow nemesis={getNemesis(nemesis)} />
                    <Divider />
                    <RatingsRow npc={getNemesis(nemesis)} />
                </Grid>
            </CardContent>
        </Card>
    )
}
