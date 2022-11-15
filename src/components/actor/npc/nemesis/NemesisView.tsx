import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import Nemesis from "../../../../models/actor/npc/Nemesis";
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
import EditIcon from "@mui/icons-material/Edit";
import {Path} from "../../../../services/Path";
import ViewNonPlayerCharacterSkillTable from "../ViewNonPlayerCharacterSkillTable";

export default function NemesisView(props: {nemesis: Nemesis}) {
    const {nemesis} = props
    const { name } = useParams<{ name: string }>()
    let navigate = useNavigate()

    const getRatings = ():string => {
        return '[combat] ' + String(nemesis?.combat!!) + ' [social] ' + String(nemesis?.social!!) + ' [general] ' + String(nemesis?.general!!)
    }

    const onEdit = () => {
        navigate(Path.Nemesis + name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={name}
                subheader={<GenesysDescriptionTypography text={getRatings()} />}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewCharacteristicCard characteristic={nemesis?.brawn!!} type={CharacteristicType.Brawn} />
                        <ViewCharacteristicCard characteristic={nemesis?.agility!!} type={CharacteristicType.Agility}/>
                        <ViewCharacteristicCard characteristic={nemesis?.intellect!!} type={CharacteristicType.Intellect}/>
                        <ViewCharacteristicCard characteristic={nemesis?.cunning!!} type={CharacteristicType.Cunning}/>
                        <ViewCharacteristicCard characteristic={nemesis?.willpower!!} type={CharacteristicType.Willpower}/>
                        <ViewCharacteristicCard characteristic={nemesis?.presence!!} type={CharacteristicType.Presence}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <SoakCard soak={nemesis?.soak!!} />
                        <ViewStatsCard stats={nemesis?.wounds!!} type={StatsType.Wounds}/>
                        <ViewStatsCard stats={nemesis?.strain!!} type={StatsType.Strain}/>
                        <ViewDefenseCard defense={nemesis?.melee!!} type={DefenseType.Melee}/>
                        <ViewDefenseCard defense={nemesis?.ranged!!} type={DefenseType.Ranged}/>
                    </Grid>
                    <Divider />
                    <ViewNonPlayerCharacterSkillTable npc={nemesis}/>
                    <Divider />
                    <NemesisTalentTable nemesis={nemesis}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
