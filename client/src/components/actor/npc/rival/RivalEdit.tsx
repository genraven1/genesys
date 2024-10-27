import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import * as React from "react";
import Rival from "../../../../models/actor/npc/Rival";
import {ActorPath} from "../../../../services/RootPath";
import CheckIcon from "@mui/icons-material/Check";
import RivalTalentCard from "./talent/RivalTalentCard";
import RivalAbilityCard from "./ability/RivalAbilityCard";
import RivalEquipmentCard from "./equipment/RivalEquipmentCard";

interface Props {
    riv: Rival
}

export default function RivalEdit(props: Props) {
    const {riv} = props
    const [rival, setRival] = useState<Rival>(riv)
    let navigate = useNavigate()

    useEffect(() => {
        setRival(riv)
    }, [riv])

    const onView = () => {
        navigate(ActorPath.Rival + rival.id + '/view')
    }

    return (
        <Card>
            <CardHeader title={rival?.name!!} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}/>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    {/*<Grid container spacing={2}>*/}
                    {/*    <EditCharacteristicCard characteristic={rival?.brawn!!} type={CharacteristicType.Brawn}*/}
                    {/*                            onChange={(value: number): void => {*/}
                    {/*                                onChange(ActorKey.Brawn, value)*/}
                    {/*                            }}/>*/}
                    {/*    <EditCharacteristicCard characteristic={rival?.agility!!} type={CharacteristicType.Agility}*/}
                    {/*                            onChange={(value: number): void => {*/}
                    {/*                                onChange(ActorKey.Agility, value)*/}
                    {/*                            }}/>*/}
                    {/*    <EditCharacteristicCard characteristic={rival?.intellect!!} type={CharacteristicType.Intellect}*/}
                    {/*                            onChange={(value: number): void => {*/}
                    {/*                                onChange(ActorKey.Intellect, value)*/}
                    {/*                            }}/>*/}
                    {/*    <EditCharacteristicCard characteristic={rival?.cunning!!} type={CharacteristicType.Cunning}*/}
                    {/*                            onChange={(value: number): void => {*/}
                    {/*                                onChange(ActorKey.Cunning, value)*/}
                    {/*                            }}/>*/}
                    {/*    <EditCharacteristicCard characteristic={rival?.willpower!!} type={CharacteristicType.Willpower}*/}
                    {/*                            onChange={(value: number): void => {*/}
                    {/*                                onChange(ActorKey.Willpower, value)*/}
                    {/*                            }}/>*/}
                    {/*    <EditCharacteristicCard characteristic={rival?.presence!!} type={CharacteristicType.Presence}*/}
                    {/*                            onChange={(value: number): void => {*/}
                    {/*                                onChange(ActorKey.Presence, value)*/}
                    {/*                            }}/>*/}
                    {/*</Grid>*/}
                    {/*<Divider/>*/}
                    {/*<Grid container spacing={2}>*/}
                    {/*    <NonPlayerActorSoakCard actor={rival}/>*/}
                    {/*    <EditStatsCard stats={rival?.wounds!!} type={StatsType.Wounds}*/}
                    {/*                   onChange={(value: number): void => {*/}
                    {/*                       onChange(ActorKey.Wounds, value)*/}
                    {/*                   }}/>*/}
                    {/*    <NonPlayerActorDefenseCard npc={rival}/>*/}
                    {/*</Grid>*/}
                    {/*<Divider/>*/}
                    {/*<Grid container spacing={10}>*/}
                    {/*    <RatingCard rating={rival?.combat!!} type={RatingType.Combat}*/}
                    {/*                onChange={(value: number): void => {*/}
                    {/*                    onChange(NonPlayerCharacterKey.Combat, value)*/}
                    {/*                }}/>*/}
                    {/*    <RatingCard rating={rival?.social!!} type={RatingType.Social}*/}
                    {/*                onChange={(value: number): void => {*/}
                    {/*                    onChange(NonPlayerCharacterKey.Social, value)*/}
                    {/*                }}/>*/}
                    {/*    <RatingCard rating={rival?.general!!} type={RatingType.General}*/}
                    {/*                onChange={(value: number): void => {*/}
                    {/*                    onChange(NonPlayerCharacterKey.General, value)*/}
                    {/*                }}/>*/}
                    {/*</Grid>*/}
                    {/*<Divider/>*/}
                    {/*<RivalSkillCard rival={rival}/>*/}
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
