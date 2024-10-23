import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {StatsType} from "../../../../models/actor/Stats";
import NonPlayerActorSoakCard from "../NonPlayerActorSoakCard";
import * as React from "react";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import EditIcon from "@mui/icons-material/Edit";
import {ActorPath} from "../../../../../client/src/services/RootPath";
import Minion from "../../../../models/actor/npc/Minion";
import CharacteristicRow from "../../../../../client/src/components/actor/common/common/CharacteristicRow";
import {getRatings} from "../../../../models/actor/npc/NonPlayerActor";
import {ViewStatsCard} from "../../../../../client/src/components/actor/StatsCard";
import MinionTalentCard from "./talent/MinionTalentCard";
import MinionSkillCard from "./skill/MinionSkillCard";
import MinionAbilityCard from "./ability/MinionAbilityCard";
import MinionEquipmentCard from "./equipment/MinionEquipmentCard";
import NonPlayerActorDefenseCard from "../NonPlayerActorDefenseCard";

interface Props {
    minion: Minion
}

export default function MinionView(props: Props) {
    const {minion} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(ActorPath.Minion + minion.name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={minion.name}
                subheader={<GenesysDescriptionTypography text={getRatings(minion)}/>}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <CharacteristicRow actor={minion}/>
                    <Divider/>
                    <Grid container spacing={2}>
                        <NonPlayerActorSoakCard actor={minion}/>
                        <ViewStatsCard stats={minion?.wounds!!} type={StatsType.Wounds}/>
                        <NonPlayerActorDefenseCard npc={minion}/>
                    </Grid>
                    <Divider/>
                    <MinionSkillCard minion={minion}/>
                    <Divider/>
                    <MinionEquipmentCard minion={minion}/>
                    <Divider/>
                    <MinionAbilityCard minion={minion}/>
                    <Divider/>
                    <MinionTalentCard minion={minion}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
