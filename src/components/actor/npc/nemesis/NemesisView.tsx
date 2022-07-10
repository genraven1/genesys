import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import Nemesis, {DefaultNemesis} from "../../../../models/actor/npc/Nemesis";
import {CharacteristicType} from "../../../../models/actor/Characteristics";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import SoakCard from "../../SoakCard";
import * as React from "react";
import NemesisTalentTable from "./NemesisTalentTable";
import ViewCharacteristicCard from "../../ViewCharacteristicCard";
import GenesysDescriptionTypography from "../../../common/GenesysDescriptionTypography";
import ViewStatsCard from "../../ViewStatsCard";
import ViewDefenseCard from "../../ViewDefenseCard";
import ViewSkillTable from "./ViewNemesisSkills";
import EditIcon from "@mui/icons-material/Edit";
import {Path} from "../../../../services/Path";

export default function Nemesisview() {
    const { name } = useParams<{ name: string }>();
    const [nemesis, setNemesis] = useState<Nemesis | null>(null);
    let navigate = useNavigate()

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

    const getRatings = ():string => {
        return '[combat] ' + String(getNemesis(nemesis).combat) + ' [social] ' + String(getNemesis(nemesis).social) + ' [general] ' + String(getNemesis(nemesis).general)
    }

    const onEdit = () => {
        navigate(Path.Nemesis + name + '/edit');
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={getName(nemesis)}
                subheader={<GenesysDescriptionTypography text={getRatings()} />}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
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
                    <Grid container spacing={10}>
                        <SoakCard soak={getNemesis(nemesis).soak} />
                        <ViewStatsCard stats={getNemesis(nemesis).wounds} type={StatsType.Wounds}/>
                        <ViewStatsCard stats={getNemesis(nemesis).strain} type={StatsType.Strain}/>
                        <ViewDefenseCard defense={getNemesis(nemesis).melee} type={DefenseType.Melee}/>
                        <ViewDefenseCard defense={getNemesis(nemesis).ranged} type={DefenseType.Ranged}/>
                    </Grid>
                    <Divider />
                    <ViewSkillTable  nemesis={getNemesis(nemesis)}/>
                    <Divider />
                    <NemesisTalentTable nemesis={getNemesis(nemesis)}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
