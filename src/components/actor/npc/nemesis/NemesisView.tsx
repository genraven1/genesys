import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import Nemesis from "../../../../models/actor/npc/Nemesis";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import SoakCard from "../../SoakCard";
import * as React from "react";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import ViewStatsCard from "../../ViewStatsCard";
import ViewDefenseCard from "../../ViewDefenseCard";
import EditIcon from "@mui/icons-material/Edit";
import {ActorPath} from "../../../../services/Path";
import NonPlayerCharacterSkillCard from "../skill/NonPlayerCharacterSkillCard";
import NonPlayerCharacterTalentCard from "../talent/NonPlayerCharacterTalentCard";
import ViewNonPlayerCharacterEquipmentCard from "../equipment/ViewNonPlayerCharacterEquipmentCard";
import ViewNonPlayerCharacterAbilityCard from "../ability/ViewNonPlayerCharacterAbilityCard";
import ViewCharacteristicRow from "../../common/ViewCharacteristicRow";

export default function NemesisView(props: {nemesis: Nemesis}) {
    const {nemesis} = props
    const { name } = useParams<{ name: string }>()
    let navigate = useNavigate()

    const getRatings = ():string => {
        return '[combat] ' + String(nemesis?.combat!!) + ' [social] ' + String(nemesis?.social!!) + ' [general] ' + String(nemesis?.general!!)
    }

    const onEdit = () => {
        navigate(ActorPath.Nemesis + name + '/edit')
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
                    <ViewCharacteristicRow actor={nemesis}/>
                    <Divider />
                    <Grid container spacing={10}>
                        <SoakCard soak={nemesis?.soak!!} />
                        <ViewStatsCard stats={nemesis?.wounds!!} type={StatsType.Wounds}/>
                        <ViewStatsCard stats={nemesis?.strain!!} type={StatsType.Strain}/>
                        <ViewDefenseCard defense={nemesis?.melee!!} type={DefenseType.Melee}/>
                        <ViewDefenseCard defense={nemesis?.ranged!!} type={DefenseType.Ranged}/>
                    </Grid>
                    <Divider />
                    <NonPlayerCharacterSkillCard npc={nemesis}/>
                    <Divider/>
                    <ViewNonPlayerCharacterEquipmentCard npc={nemesis}/>
                    <Divider />
                    <ViewNonPlayerCharacterAbilityCard npc={nemesis}/>
                    <Divider/>
                    <NonPlayerCharacterTalentCard npc={nemesis}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
