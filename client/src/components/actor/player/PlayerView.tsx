import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import Player from '../../../models/actor/player/Player';
import {StatsType} from '../../../models/actor/Stats';
import {ActorPath} from '../../../services/Path';
import EditIcon from "@mui/icons-material/Edit";
import SoakCard from '../SoakCard';
import ViewStatsCard from '../ViewStatsCard';
import ViewPlayerSkillTable from './skill/ViewPlayerSkillTable';
import PlayerTalentTable from './PlayerTalentTable';
import ViewPlayerEquipmentCard from "./equipment/ViewPlayerEquipmentCard";
import ViewCharacteristicRow from "../common/ViewCharacteristicRow";
import Setting from "../../../models/Setting";
import ViewSettingsCard from "../../common/setting/ViewSettingsCard";
import ViewDefenseCard from "../ViewDefenseCard";
import * as React from "react";

interface Props {
    player: Player
    settings: Setting[]
}

export default function PlayerView(props: Props) {
    const {player, settings} = props
    const { id } = useParams<{ id: string }>()
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(ActorPath.Player + id + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}} title={player?.name!!}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <ViewCharacteristicRow actor={player}/>
                    <Divider />
                    <Grid container spacing={2}>
                        <SoakCard soak={player?.soak!!} />
                        <ViewStatsCard stats={player?.wounds!!} type={StatsType.Wounds}/>
                        <ViewStatsCard stats={player?.strain!!} type={StatsType.Strain}/>
                        <ViewDefenseCard melee={player?.melee!!} ranged={player?.ranged!!}/>
                    </Grid>
                    <Divider />
                    <ViewPlayerSkillTable  player={player}/>
                    <Divider />
                    <ViewPlayerEquipmentCard player={player}/>
                    <Divider />
                    <PlayerTalentTable player={player}/>
                </Grid>
                <ViewSettingsCard settings={player?.settings!!} allSettings={settings}/>
            </CardContent>
        </Card>
    )
}
