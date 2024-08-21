import {Card, CardContent, CardHeader, Grid, IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import {useFetchAllSettings} from "../setting/SettingWorkflow";
import * as React from "react";
import Archetype from "../../models/actor/player/Archetype";
import {RootPath} from "../../services/RootPath";
import ViewSettingsCard from "../common/setting/ViewSettingsCard";
import {ViewCharacteristicCard} from "../actor/CharacteristicCard";
import {CharacteristicType} from "../../models/character/Characteristic";
import {ViewStatsCard} from "../actor/StatsCard";
import {StatsType} from "../../models/actor/Stats";
import {ViewFieldCard} from "../common/ViewFieldCard";
import ArchetypeAbilityCard from "./ability/ArchetypeAbilityCard";

interface Props {
    archetype: Archetype
}

export default function ArchetypeView(props: Props) {
    const {archetype} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(RootPath.Archetype + archetype.name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}} title={archetype.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <ViewFieldCard name={'Description'} value={archetype.description}/>
                    </Grid>
                    <Grid container spacing={2}>
                        <ViewCharacteristicCard characteristic={archetype.brawn} type={CharacteristicType.Brawn} />
                        <ViewCharacteristicCard characteristic={archetype.agility} type={CharacteristicType.Agility}/>
                        <ViewCharacteristicCard characteristic={archetype.intellect} type={CharacteristicType.Intellect}/>
                        <ViewCharacteristicCard characteristic={archetype.cunning} type={CharacteristicType.Cunning}/>
                        <ViewCharacteristicCard characteristic={archetype.willpower} type={CharacteristicType.Willpower}/>
                        <ViewCharacteristicCard characteristic={archetype.presence} type={CharacteristicType.Presence}/>
                    </Grid>
                    <Grid container spacing={2}>
                        <ViewStatsCard stats={archetype.wounds} type={StatsType.Wounds}/>
                        <ViewStatsCard stats={archetype.strain} type={StatsType.Strain}/>
                    </Grid>
                    <Grid container spacing={2}>
                        <ViewFieldCard name={'Starting Skill'} value={String(archetype?.skill?.name!)}/>
                    </Grid>
                    <Grid container spacing={2}>
                        <ViewFieldCard name={'Base Experience'} value={String(archetype.experience)}/>
                    </Grid>
                </Grid>
                <ArchetypeAbilityCard archetype={archetype}/>
            </CardContent>
        </Card>
    )
}
