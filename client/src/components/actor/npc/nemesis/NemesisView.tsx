import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Nemesis from "../../../../models/actor/npc/Nemesis";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import SoakCard from "../../SoakCard";
import * as React from "react";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import EditIcon from "@mui/icons-material/Edit";
import {ActorPath} from "../../../../services/Path";
import ViewNonPlayerCharacterEquipmentCard from "../equipment/ViewNonPlayerCharacterEquipmentCard";
import ViewNonPlayerCharacterAbilityCard from "../ability/ViewNonPlayerCharacterAbilityCard";
import ViewCharacteristicRow from "../../common/ViewCharacteristicRow";
import { getRatings } from "../../../../models/actor/npc/NonPlayerActor";
import Setting from "../../../../models/Setting";
import ViewSettingsCard from "../../../common/setting/ViewSettingsCard";
import {ViewStatsCard} from "../../StatsCard";
import {ViewDefenseCard} from "../../DefenseCard";
import NemesisSkillCard from "./skill/NemesisSkillCard";
import NemesisTalentCard from "./talent/NemesisTalentCard";

interface Props {
    nemesis: Nemesis
    settings: Setting[]
}

export default function NemesisView(props: Props) {
    const {nemesis, settings} = props
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
                    <NemesisSkillCard nemesis={nemesis}/>
                    <Divider/>
                    <ViewNonPlayerCharacterEquipmentCard npc={nemesis}/>
                    <Divider />
                    <ViewNonPlayerCharacterAbilityCard npc={nemesis}/>
                    <Divider/>
                    <NemesisTalentCard nemesis={nemesis}/>
                </Grid>
                <ViewSettingsCard settings={nemesis.settings} allSettings={settings}/>
            </CardContent>
        </Card>
    )
}
