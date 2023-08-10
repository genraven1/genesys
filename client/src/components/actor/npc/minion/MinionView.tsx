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
import NonPlayerCharacterTalentTable from "../talent/NonPlayerCharacterTalentTable";
import Minion from "../../../../models/actor/npc/Minion";
import ViewNonPlayerCharacterEquipmentCard from "../equipment/ViewNonPlayerCharacterEquipmentCard";
import ViewNonPlayerCharacterAbilityCard from "../ability/ViewNonPlayerCharacterAbilityCard";
import ViewCharacteristicRow from "../../common/ViewCharacteristicRow";
import {getRatings} from "../../../../models/actor/npc/NonPlayerCharacter";
import Setting from "../../../../models/Setting";
import ViewSettingsCard from "../../../common/setting/ViewSettingsCard";
import NonPlayerCharacterSkillCard from "../skill/NonPlayerCharacterSkillCard";

interface Props {
    minion: Minion
    settings: Setting[]
}

export default function MinionView(props: Props) {
    const {minion, settings} = props
    const {name} = useParams<{ name: string }>()
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(ActorPath.Minion + name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={name}
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
                    <Grid container spacing={10}>
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
                    <NonPlayerCharacterTalentTable npc={minion}/>
                </Grid>
                <ViewSettingsCard settingIds={minion?.settings!!} allSettings={settings}/>
            </CardContent>
        </Card>
    )
}
