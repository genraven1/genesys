import {Card, CardContent, CardHeader, Divider, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import {CharacteristicType} from "../../../../models/actor/Characteristics";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import EditCharacteristicCard from "../../EditCharacteristicCard";
import RatingCard from "../RatingCard";
import {RatingType} from "../../../../models/actor/npc/NonPlayerCharacter";
import SoakCard from "../../SoakCard";
import StatsCard from "../../StatsCard";
import DefenseCard from "../../DefenseCard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import Rival, {RivalKey} from "../../../../models/actor/npc/Rival";

export default function RivalView() {
    const { name } = useParams<{ name: string }>();
    const [rival, setRival] = useState<Rival>();
    const [errors, setErrors] = useState({} as any);

    useEffect(() => {
        if (!name) {
            return;
        }
        (async (): Promise<void> => {
            const rivalData = await ActorService.getRival(name);
            if (!rivalData) {return;}
            setRival(rivalData);
        })();
    }, [name])

    const onCharacteristicChange = (copyRival: Rival, value: number, type: CharacteristicType) => {
        switch (type) {
            case CharacteristicType.Brawn:
                copyRival.brawn.current = value
                break;
            case CharacteristicType.Agility:
                copyRival.agility.current = value
                break;
            case CharacteristicType.Intellect:
                copyRival.intellect.current = value
                break;
            case CharacteristicType.Cunning:
                copyRival.cunning.current = value
                break;
            case CharacteristicType.Willpower:
                copyRival.willpower.current = value
                break;
            case CharacteristicType.Presence:
                copyRival.presence.current = value
                break;
        }
    }

    const onDefenseChange = (copyRival: Rival, value: number, type: DefenseType) => {
        switch (type) {
            case DefenseType.Melee:
                copyRival.melee.current = value
                break;
            case DefenseType.Ranged:
                copyRival.ranged.current = value
                break;
        }
    }

    const onChange = async (key: keyof Rival, value: number) => {
        if (value === null || (rival !== null && rival!![key] === value)) {
            return;
        }
        const copyRival = {...rival} as Rival
        switch (key) {
            case "brawn":
                onCharacteristicChange(copyRival, value, CharacteristicType.Brawn)
                break;
            case "agility":
                onCharacteristicChange(copyRival, value, CharacteristicType.Agility)
                break;
            case "intellect":
                onCharacteristicChange(copyRival, value, CharacteristicType.Intellect)
                break;
            case "cunning":
                onCharacteristicChange(copyRival, value, CharacteristicType.Cunning)
                break;
            case "willpower":
                onCharacteristicChange(copyRival, value, CharacteristicType.Willpower)
                break;
            case "presence":
                onCharacteristicChange(copyRival, value, CharacteristicType.Presence)
                break;
            case 'talents':
                break
            case "soak":
                copyRival.soak = copyRival.brawn.current
                break;
            case "melee":
                onDefenseChange(copyRival, value, DefenseType.Melee)
                break;
            case "ranged":
                onDefenseChange(copyRival, value, DefenseType.Ranged)
                break;
            case "wounds":
                copyRival.wounds.max = value
                break;
            case "name":
                break;
        }

        await updateRival(copyRival)
    }

    const updateRival = async (copyRival: Rival): Promise<Rival> => {
        copyRival.soak = copyRival.brawn.current
        setRival(copyRival)
        await ActorService.updateRival(copyRival.name, copyRival)
        return rival!!
    }

    return (
        <Card>
            <CardHeader title={rival?.name} />
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <EditCharacteristicCard characteristic={rival!!.brawn} type={CharacteristicType.Brawn} onChange={(value: number): void => { onChange(RivalKey.Brawn, value) }}/>
                        <EditCharacteristicCard characteristic={rival!!.agility} type={CharacteristicType.Agility} onChange={(value: number): void => { onChange(RivalKey.Agility, value) }}/>
                        <EditCharacteristicCard characteristic={rival!!.intellect} type={CharacteristicType.Intellect} onChange={(value: number): void => { onChange(RivalKey.Intellect, value) }}/>
                        <EditCharacteristicCard characteristic={rival!!.cunning} type={CharacteristicType.Cunning} onChange={(value: number): void => { onChange(RivalKey.Cunning, value) }}/>
                        <EditCharacteristicCard characteristic={rival!!.willpower} type={CharacteristicType.Willpower} onChange={(value: number): void => { onChange(RivalKey.Willpower, value) }}/>
                        <EditCharacteristicCard characteristic={rival!!.presence} type={CharacteristicType.Presence} onChange={(value: number): void => { onChange(RivalKey.Presence, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <SoakCard soak={rival!!.soak} />
                        <StatsCard stats={rival!!.wounds} type={StatsType.Wounds} onChange={(value: number): void => { onChange(RivalKey.Wounds, value) }}/>
                        <DefenseCard defense={rival!!.melee} type={DefenseType.Melee} onChange={(value: number): void => { onChange(RivalKey.Melee, value) }}/>
                        <DefenseCard defense={rival!!.ranged} type={DefenseType.Ranged} onChange={(value: number): void => { onChange(RivalKey.Ranged, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <RatingCard  rating={rival!!.combat} type={RatingType.Combat} onChange={(value: number): void => { onChange(RivalKey.Combat, value) }}/>
                        <RatingCard  rating={rival!!.social} type={RatingType.Social} onChange={(value: number): void => { onChange(RivalKey.Social, value) }}/>
                        <RatingCard  rating={rival!!.general} type={RatingType.General} onChange={(value: number): void => { onChange(RivalKey.General, value) }}/>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{textAlign: "center"}}>Skills</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </Grid>
            </CardContent>
        </Card>
    )
}
