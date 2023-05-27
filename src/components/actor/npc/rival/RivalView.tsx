import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import SoakCard from "../../SoakCard";
import * as React from "react";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import ViewStatsCard from "../../ViewStatsCard";
import ViewDefenseCard from "../../ViewDefenseCard";
import EditIcon from "@mui/icons-material/Edit";
import {ActorPath} from "../../../../services/Path";
import Rival from "../../../../models/actor/npc/Rival";
import NonPlayerCharacterTalentCard from "../talent/NonPlayerCharacterTalentCard";
import NonPlayerCharacterSkillCard from "../skill/NonPlayerCharacterSkillCard";
import ViewNonPlayerCharacterEquipmentCard from "../equipment/ViewNonPlayerCharacterEquipmentCard";
import ViewNonPlayerCharacterAbilityCard from "../ability/ViewNonPlayerCharacterAbilityCard";
import ViewCharacteristicRow from "../../common/ViewCharacteristicRow";

export default function RivalView(props: {rival: Rival}) {
    const {rival} = props
    const { name } = useParams<{ name: string }>()
    let navigate = useNavigate()

    const getRatings = ():string => {
        return '[combat] ' + String(rival?.combat!!) + ' [social] ' + String(rival?.social!!) + ' [general] ' + String(rival?.general!!)
    }

    const onEdit = () => {
        navigate(ActorPath.Rival + name + '/edit')
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
                    <ViewCharacteristicRow actor={rival}/>
                    <Divider />
                    <Grid container spacing={10}>
                        <SoakCard soak={rival?.soak!!} />
                        <ViewStatsCard stats={rival?.wounds!!} type={StatsType.Wounds}/>
                        <ViewDefenseCard defense={rival?.melee!!} type={DefenseType.Melee}/>
                        <ViewDefenseCard defense={rival?.ranged!!} type={DefenseType.Ranged}/>
                    </Grid>
                    <Divider/>
                    <NonPlayerCharacterSkillCard npc={rival}/>
                    <Divider/>
                    <ViewNonPlayerCharacterEquipmentCard npc={rival}/>
                    <Divider/>
                    <ViewNonPlayerCharacterAbilityCard npc={rival}/>
                    <Divider/>
                    <NonPlayerCharacterTalentCard npc={rival}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
