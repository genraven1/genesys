import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {StatsType} from "../../../../models/actor/Stats";
import NonPlayerActorSoakCard from "../NonPlayerActorSoakCard";
import * as React from "react";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import EditIcon from "@mui/icons-material/Edit";
import Rival from "../../../../models/actor/npc/Rival";
import { getRatings } from "../../../../models/actor/npc/NonPlayerActor";
import RivalSkillCard from "./skill/RivalSkillCard";
import RivalTalentCard from "./talent/RivalTalentCard";
import RivalAbilityCard from "./ability/RivalAbilityCard";
import RivalEquipmentCard from "./equipment/RivalEquipmentCard";
import NonPlayerActorDefenseCard from "../NonPlayerActorDefenseCard";
import {ActorPath} from "../../../../services/RootPath";
import CharacteristicRow from "../../common/CharacteristicRow";
import {ViewStatsCard} from "../../StatsCard";

interface Props {
    rival: Rival
}

export default function RivalView(props: Props) {
    const {rival} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(ActorPath.Rival + rival.id + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={rival.name}
                subheader={<GenesysDescriptionTypography text={getRatings(rival)} />}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <CharacteristicRow actor={rival}/>
                    <Divider />
                    <Grid container spacing={10}>
                        <NonPlayerActorSoakCard actor={rival} />
                        <ViewStatsCard stats={rival.wounds} type={StatsType.Wounds}/>
                        <NonPlayerActorDefenseCard npc={rival}/>
                    </Grid>
                    <Divider/>
                    <RivalSkillCard rival={rival}/>
                    <Divider/>
                    <RivalEquipmentCard rival={rival}/>
                    <Divider/>
                    <RivalAbilityCard rival={rival}/>
                    <Divider/>
                    <RivalTalentCard rival={rival}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
