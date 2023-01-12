import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {CharacteristicType} from "../../../../models/actor/Characteristics";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import SoakCard from "../../SoakCard";
import * as React from "react";
import ViewCharacteristicCard from "../../ViewCharacteristicCard";
import GenesysDescriptionTypography from "../../../common/GenesysDescriptionTypography";
import ViewStatsCard from "../../ViewStatsCard";
import ViewDefenseCard from "../../ViewDefenseCard";
import EditIcon from "@mui/icons-material/Edit";
import {Path} from "../../../../services/Path";
import ViewNonPlayerCharacterSkillTable from "../ViewNonPlayerCharacterSkillTable";
import NonPlayerCharacterTalentTable from "../NonPlayerCharacterTalentTable";
import Minion from "../../../../models/actor/npc/Minion";

export default function MinionView(props: {minion: Minion}) {
    const {minion} = props
    const { name } = useParams<{ name: string }>()
    let navigate = useNavigate()

    const getRatings = ():string => {
        return '[combat] ' + String(minion?.combat!!) + ' [social] ' + String(minion?.social!!) + ' [general] ' + String(minion?.general!!)
    }

    const onEdit = () => {
        navigate(Path.Minion + name + '/edit')
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
                    <Grid container spacing={10}>
                        <ViewCharacteristicCard characteristic={minion?.brawn!!} type={CharacteristicType.Brawn} />
                        <ViewCharacteristicCard characteristic={minion?.agility!!} type={CharacteristicType.Agility}/>
                        <ViewCharacteristicCard characteristic={minion?.intellect!!} type={CharacteristicType.Intellect}/>
                        <ViewCharacteristicCard characteristic={minion?.cunning!!} type={CharacteristicType.Cunning}/>
                        <ViewCharacteristicCard characteristic={minion?.willpower!!} type={CharacteristicType.Willpower}/>
                        <ViewCharacteristicCard characteristic={minion?.presence!!} type={CharacteristicType.Presence}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <SoakCard soak={minion?.soak!!} />
                        <ViewStatsCard stats={minion?.wounds!!} type={StatsType.Wounds}/>
                        <ViewDefenseCard defense={minion?.melee!!} type={DefenseType.Melee}/>
                        <ViewDefenseCard defense={minion?.ranged!!} type={DefenseType.Ranged}/>
                    </Grid>
                    <Divider />
                    <ViewNonPlayerCharacterSkillTable npc={minion}/>
                    <Divider />
                    <NonPlayerCharacterTalentTable npc={minion}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
