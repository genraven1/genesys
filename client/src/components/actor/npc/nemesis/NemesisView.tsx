import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Nemesis from "../../../../models/actor/npc/Nemesis";
import {StatsType} from "../../../../models/actor/Stats";
import NonPlayerActorSoakCard from "../NonPlayerActorSoakCard";
import * as React from "react";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import EditIcon from "@mui/icons-material/Edit";
import { getRatings } from "../../../../models/actor/npc/NonPlayerActor";
import NemesisSkillCard from "./skill/NemesisSkillCard";
import NemesisTalentCard from "./talent/NemesisTalentCard";
import NemesisEquipmentCard from "./equipment/NemesisEquipmentCard";
import NemesisAbilityCard from "./ability/NemesisAbilityCard";
import NonPlayerActorDefenseCard from "../NonPlayerActorDefenseCard";
import CharacteristicRow from "../../common/CharacteristicRow";
import {ViewStatsCard} from "../../StatsCard";
import {ActorPath} from "../../../../services/RootPath";

interface Props {
    nemesis: Nemesis
}

export default function NemesisView(props: Props) {
    const {nemesis} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(ActorPath.Nemesis + nemesis.name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={nemesis.name}
                subheader={<GenesysDescriptionTypography text={getRatings(nemesis)} />}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <CharacteristicRow actor={nemesis}/>
                    <Divider />
                    <Grid container spacing={10}>
                        <NonPlayerActorSoakCard actor={nemesis} />
                        <ViewStatsCard stats={nemesis.wounds} type={StatsType.Wounds}/>
                        <ViewStatsCard stats={nemesis.strain} type={StatsType.Strain}/>
                        <NonPlayerActorDefenseCard npc={nemesis}/>
                    </Grid>
                    <Divider />
                    <NemesisSkillCard nemesis={nemesis}/>
                    <Divider/>
                    <NemesisEquipmentCard nemesis={nemesis}/>
                    <Divider />
                    <NemesisAbilityCard nemesis={nemesis}/>
                    <Divider/>
                    <NemesisTalentCard nemesis={nemesis}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
