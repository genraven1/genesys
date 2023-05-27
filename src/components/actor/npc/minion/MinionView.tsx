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
import ViewNonPlayerCharacterSkillTable from "../skill/ViewNonPlayerCharacterSkillTable";
import NonPlayerCharacterTalentTable from "../talent/NonPlayerCharacterTalentTable";
import Minion from "../../../../models/actor/npc/Minion";
import ViewNonPlayerCharacterEquipmentCard from "../equipment/ViewNonPlayerCharacterEquipmentCard";
import ViewNonPlayerCharacterAbilityCard from "../ability/ViewNonPlayerCharacterAbilityCard";
import ViewCharacteristicRow from "../../common/ViewCharacteristicRow";

export default function MinionView(props: {minion: Minion}) {
    const {minion} = props
    const { name } = useParams<{ name: string }>()
    let navigate = useNavigate()

    const getRatings = ():string => {
        return '[combat] ' + String(minion?.combat!!) + ' [social] ' + String(minion?.social!!) + ' [general] ' + String(minion?.general!!)
    }

    const onEdit = () => {
        navigate(ActorPath.Minion + name + '/edit')
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
                    <ViewCharacteristicRow actor={minion}/>
                    <Divider />
                    <Grid container spacing={10}>
                        <SoakCard soak={minion?.soak!!} />
                        <ViewStatsCard stats={minion?.wounds!!} type={StatsType.Wounds}/>
                        <ViewDefenseCard defense={minion?.melee!!} type={DefenseType.Melee}/>
                        <ViewDefenseCard defense={minion?.ranged!!} type={DefenseType.Ranged}/>
                    </Grid>
                    <Divider />
                    <ViewNonPlayerCharacterSkillTable npc={minion}/>
                    <Divider/>
                    <ViewNonPlayerCharacterEquipmentCard npc={minion}/>
                    <Divider />
                    <ViewNonPlayerCharacterAbilityCard npc={minion}/>
                    <Divider/>
                    <NonPlayerCharacterTalentTable npc={minion}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
