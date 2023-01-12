import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {CharacteristicType} from "../../../../models/actor/Characteristics";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import SoakCard from "../../SoakCard";
import * as React from "react";
import ViewCharacteristicCard from "../../ViewCharacteristicCard";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import ViewStatsCard from "../../ViewStatsCard";
import ViewDefenseCard from "../../ViewDefenseCard";
import EditIcon from "@mui/icons-material/Edit";
import {Path} from "../../../../services/Path";
import ViewNonPlayerCharacterSkillTable from "../ViewNonPlayerCharacterSkillTable";
import Rival from "../../../../models/actor/npc/Rival";
import NonPlayerCharacterTalentTable from "../NonPlayerCharacterTalentTable";

export default function RivalView(props: {rival: Rival}) {
    const {rival} = props
    const { name } = useParams<{ name: string }>()
    let navigate = useNavigate()

    const getRatings = ():string => {
        return '[combat] ' + String(rival?.combat!!) + ' [social] ' + String(rival?.social!!) + ' [general] ' + String(rival?.general!!)
    }

    const onEdit = () => {
        navigate(Path.Rival + name + '/edit')
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
                        <ViewCharacteristicCard characteristic={rival?.brawn!!} type={CharacteristicType.Brawn} />
                        <ViewCharacteristicCard characteristic={rival?.agility!!} type={CharacteristicType.Agility}/>
                        <ViewCharacteristicCard characteristic={rival?.intellect!!} type={CharacteristicType.Intellect}/>
                        <ViewCharacteristicCard characteristic={rival?.cunning!!} type={CharacteristicType.Cunning}/>
                        <ViewCharacteristicCard characteristic={rival?.willpower!!} type={CharacteristicType.Willpower}/>
                        <ViewCharacteristicCard characteristic={rival?.presence!!} type={CharacteristicType.Presence}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <SoakCard soak={rival?.soak!!} />
                        <ViewStatsCard stats={rival?.wounds!!} type={StatsType.Wounds}/>
                        <ViewDefenseCard defense={rival?.melee!!} type={DefenseType.Melee}/>
                        <ViewDefenseCard defense={rival?.ranged!!} type={DefenseType.Ranged}/>
                    </Grid>
                    <Divider />
                    <ViewNonPlayerCharacterSkillTable npc={rival}/>
                    <Divider />
                    <NonPlayerCharacterTalentTable npc={rival}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
