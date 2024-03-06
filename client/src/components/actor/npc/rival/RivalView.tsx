import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import SoakCard from "../../SoakCard";
import * as React from "react";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import EditIcon from "@mui/icons-material/Edit";
import {ActorPath} from "../../../../services/Path";
import Rival from "../../../../models/actor/npc/Rival";
import NonPlayerCharacterTalentCard from "../talent/NonPlayerCharacterTalentCard";
import ViewNonPlayerCharacterEquipmentCard from "../equipment/ViewNonPlayerCharacterEquipmentCard";
import ViewNonPlayerCharacterAbilityCard from "../ability/ViewNonPlayerCharacterAbilityCard";
import ViewCharacteristicRow from "../../common/ViewCharacteristicRow";
import { getRatings } from "../../../../models/actor/npc/NonPlayerActor";
import Setting from "../../../../models/Setting";
import ViewSettingsCard from "../../../common/setting/ViewSettingsCard";
import {ViewStatsCard} from "../../StatsCard";
import {ViewDefenseCard} from "../../DefenseCard";
import RivalSkillCard from "./skill/RivalSkillCard";

interface Props {
    rival: Rival
    settings: Setting[]
}

export default function RivalView(props: Props) {
    const {rival, settings} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(ActorPath.Rival + rival.name + '/edit')
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
                    <ViewCharacteristicRow actor={rival}/>
                    <Divider />
                    <Grid container spacing={10}>
                        <SoakCard soak={rival?.soak!!} />
                        <ViewStatsCard stats={rival?.wounds!!} type={StatsType.Wounds}/>
                        <ViewDefenseCard defense={rival?.melee!!} type={DefenseType.Melee}/>
                        <ViewDefenseCard defense={rival?.ranged!!} type={DefenseType.Ranged}/>
                    </Grid>
                    <Divider/>
                    <RivalSkillCard rival={rival}/>
                    <Divider/>
                    <ViewNonPlayerCharacterEquipmentCard npc={rival}/>
                    <Divider/>
                    <ViewNonPlayerCharacterAbilityCard npc={rival}/>
                    <Divider/>
                    <NonPlayerCharacterTalentCard npc={rival}/>
                </Grid>
                <ViewSettingsCard settings={rival.settings} allSettings={settings}/>
            </CardContent>
        </Card>
    )
}
