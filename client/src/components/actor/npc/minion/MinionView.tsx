import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import SoakCard from "../../SoakCard";
import * as React from "react";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import EditIcon from "@mui/icons-material/Edit";
import {ActorPath} from "../../../../services/Path";
import Minion from "../../../../models/actor/npc/Minion";
import ViewNonPlayerCharacterEquipmentCard from "../equipment/ViewNonPlayerCharacterEquipmentCard";
import ViewNonPlayerCharacterAbilityCard from "../ability/ViewNonPlayerCharacterAbilityCard";
import ViewCharacteristicRow from "../../common/ViewCharacteristicRow";
import {getRatings} from "../../../../models/actor/npc/NonPlayerCharacter";
import Setting from "../../../../models/Setting";
import ViewSettingsCard from "../../../common/setting/ViewSettingsCard";
import NonPlayerCharacterSkillCard from "../skill/NonPlayerCharacterSkillCard";
import {ViewStatsCard} from "../../StatsCard";
import {ViewDefenseCard} from "../../DefenseCard";
import NonPlayerCharacterTalentCard from "../talent/NonPlayerCharacterTalentCard";

interface Props {
    minion: Minion
    settings: Setting[]
}

export default function MinionView(props: Props) {
    const {minion, settings} = props
    const {id} = useParams<{ id: string }>()
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(ActorPath.Minion + id + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={minion?.name!!}
                subheader={<GenesysDescriptionTypography text={getRatings(minion)}/>}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <ViewCharacteristicRow actor={minion}/>
                    <Divider/>
                    <Grid container spacing={2}>
                        <SoakCard soak={minion?.soak!!}/>
                        <ViewStatsCard stats={minion?.wounds!!} type={StatsType.Wounds}/>
                        <ViewDefenseCard defense={minion?.melee!!} type={DefenseType.Melee}/>
                        <ViewDefenseCard defense={minion?.ranged!!} type={DefenseType.Ranged}/>
                    </Grid>
                    <Divider/>
                    <NonPlayerCharacterSkillCard npc={minion}/>
                    <Divider/>
                    <ViewNonPlayerCharacterEquipmentCard npc={minion}/>
                    <Divider/>
                    <ViewNonPlayerCharacterAbilityCard npc={minion}/>
                    <Divider/>
                    <NonPlayerCharacterTalentCard npc={minion}/>
                </Grid>
                <ViewSettingsCard settings={minion?.settings!!} allSettings={settings}/>
            </CardContent>
        </Card>
    )
}
