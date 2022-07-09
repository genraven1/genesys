import {Button, Card, CardContent, CardHeader, Divider, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import Nemesis, {DefaultNemesis, NemesisKey} from "../../../../models/actor/npc/Nemesis";
import {CharacteristicType} from "../../../../models/actor/Characteristics";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import RatingCard from "../RatingCard";
import {RatingType} from "../../../../models/actor/npc/NonPlayerCharacter";
import SoakCard from "../../SoakCard";
import StatsCard from "../../StatsCard";
import DefenseCard from "../../DefenseCard";
import SkillTable from "./NemesisSkillTable";
import * as React from "react";
import NemesisTalentTable from "./NemesisTalentTable";
import ViewCharacteristicCard from "../../ViewCharacteristicCard";

export default function Nemesisview() {
    const { name } = useParams<{ name: string }>();
    const [nemesis, setNemesis] = useState<Nemesis | null>(null);

    useEffect(() => {
        if (!name) {
            return;
        }
        (async (): Promise<void> => {
            const nemesisData = await ActorService.getNemesis(name);
            if (!nemesisData) {return}
            setNemesis(nemesisData);
        })();
    }, [name])

    function getName(nemesis: Nemesis | null): string {
        if (!nemesis) {
            return 'Nemesis Edit'
        }
        return nemesis.name
    }

    function getNemesis(nemesis: Nemesis | null): Nemesis {
        if (!nemesis) {
            return DefaultNemesis.create();
        }
        return nemesis
    }

    return (
        <Card>
            <CardHeader title={getName(nemesis)} style={{ textAlign: 'center' }}/>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewCharacteristicCard characteristic={getNemesis(nemesis).brawn} type={CharacteristicType.Brawn} />
                        <ViewCharacteristicCard characteristic={getNemesis(nemesis).agility} type={CharacteristicType.Agility}/>
                        <ViewCharacteristicCard characteristic={getNemesis(nemesis).intellect} type={CharacteristicType.Intellect}/>
                        <ViewCharacteristicCard characteristic={getNemesis(nemesis).cunning} type={CharacteristicType.Cunning}/>
                        <ViewCharacteristicCard characteristic={getNemesis(nemesis).willpower} type={CharacteristicType.Willpower}/>
                        <ViewCharacteristicCard characteristic={getNemesis(nemesis).presence} type={CharacteristicType.Presence}/>
                    </Grid>
                    <Divider />
                    {/*<Grid container spacing={10}>*/}
                    {/*    <SoakCard soak={getNemesis(nemesis).soak} />*/}
                    {/*    <StatsCard stats={getNemesis(nemesis).wounds} type={StatsType.Wounds} onChange={(value: number): void => { onChange(NemesisKey.Wounds, value) }}/>*/}
                    {/*    <StatsCard stats={getNemesis(nemesis).strain} type={StatsType.Strain} onChange={(value: number): void => { onChange(NemesisKey.Social, value) }}/>*/}
                    {/*    <DefenseCard defense={getNemesis(nemesis).melee} type={DefenseType.Melee} onChange={(value: number): void => { onChange(NemesisKey.Melee, value) }}/>*/}
                    {/*    <DefenseCard defense={getNemesis(nemesis).ranged} type={DefenseType.Ranged} onChange={(value: number): void => { onChange(NemesisKey.Ranged, value) }}/>*/}
                    {/*</Grid>*/}
                    {/*<Divider />*/}
                    {/*<Grid container spacing={10}>*/}
                    {/*    <RatingCard  rating={getNemesis(nemesis).combat} type={RatingType.Combat} onChange={(value: number): void => { onChange(NemesisKey.Combat, value) }}/>*/}
                    {/*    <RatingCard  rating={getNemesis(nemesis).social} type={RatingType.Social} onChange={(value: number): void => { onChange(NemesisKey.Social, value) }}/>*/}
                    {/*    <RatingCard  rating={getNemesis(nemesis).general} type={RatingType.General} onChange={(value: number): void => { onChange(NemesisKey.General, value) }}/>*/}
                    {/*</Grid>*/}
                    <Divider />
                    <SkillTable  nemesis={getNemesis(nemesis)}/>
                    <Divider />
                    <NemesisTalentTable nemesis={getNemesis(nemesis)}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
