import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material"
import * as React from "react"
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import ActorService from "../../../../services/ActorService"
import Nemesis from "../../../../models/actor/npc/Nemesis"
import {CharacteristicType} from "../../../../models/character/Characteristic"
import {StatsType} from "../../../../models/actor/Stats"
import RatingCard from "../RatingCard"
import {NonPlayerCharacterKey, RatingType} from "../../../../models/actor/npc/NonPlayerActor"
import NonPlayerActorSoakCard from "../NonPlayerActorSoakCard"
import CheckIcon from '@mui/icons-material/Check'
import {ActorKey} from "../../../../models/actor/Actor"
import NemesisSkillCard from "./skill/NemesisSkillCard";
import NemesisTalentCard from "./talent/NemesisTalentCard";
import NemesisEquipmentCard from "./equipment/NemesisEquipmentCard";
import NonPlayerActorDefenseCard from "../NonPlayerActorDefenseCard";
import {ActorPath} from "../../../../services/RootPath";
import {EditCharacteristicCard} from "../../CharacteristicCard";
import {EditStatsCard} from "../../StatsCard";

interface Props {
    nem: Nemesis
}

export default function NemesisEdit(props: Props) {
    const {nem} = props
    const [nemesis, setNemesis] = useState<Nemesis>(nem)
    let navigate = useNavigate()

    useEffect(() => {
        setNemesis(nem)
    }, [nem])

    const onChange = async (key: keyof Nemesis, value: number) => {
        if (value === null) {
            return
        }
        const copyNemesis = {...nemesis} as Nemesis
        switch (key) {
            case "brawn":
                copyNemesis.brawn = value
                break
            case "agility":
                copyNemesis.agility = value
                break
            case "intellect":
                copyNemesis.intellect = value
                break
            case "cunning":
                copyNemesis.cunning = value
                break
            case "willpower":
                copyNemesis.willpower = value
                break
            case "presence":
                copyNemesis.presence = value
                break
            case "wounds":
                copyNemesis.wounds = value
                break
            case "strain":
                copyNemesis.strain = value
                break
            case "combat":
                copyNemesis.combat = value
                break
            case "social":
                copyNemesis.social = value
                break
            case "general":
                copyNemesis.general = value
                break
            default:
                break
        }

        await updateNemesis(copyNemesis)
    }

    const updateNemesis = async (copyNemesis: Nemesis) => {
        setNemesis(copyNemesis)
        await ActorService.updateNemesis(copyNemesis.name, copyNemesis)
    }

    const onView = () => {
        navigate(ActorPath.Nemesis + nemesis.name + '/view')
    }

    return (
        <Card>
            <CardHeader title={nemesis.name} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}/>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <EditCharacteristicCard characteristic={nemesis?.brawn!!} type={CharacteristicType.Brawn}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Brawn, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={nemesis?.agility!!} type={CharacteristicType.Agility}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Agility, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={nemesis?.intellect!!}
                                                type={CharacteristicType.Intellect} onChange={(value: number): void => {
                            onChange(ActorKey.Intellect, value)
                        }}/>
                        <EditCharacteristicCard characteristic={nemesis?.cunning!!} type={CharacteristicType.Cunning}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Cunning, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={nemesis?.willpower!!}
                                                type={CharacteristicType.Willpower} onChange={(value: number): void => {
                            onChange(ActorKey.Willpower, value)
                        }}/>
                        <EditCharacteristicCard characteristic={nemesis?.presence!!} type={CharacteristicType.Presence}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Presence, value)
                                                }}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={10}>
                        <NonPlayerActorSoakCard actor={nemesis}/>
                        <EditStatsCard stats={nemesis?.wounds!!} type={StatsType.Wounds}
                                       onChange={(value: number): void => {
                                       onChange(ActorKey.Wounds, value)
                                   }}/>
                        <EditStatsCard stats={nemesis?.strain!!} type={StatsType.Strain}
                                       onChange={(value: number): void => {
                                       onChange(ActorKey.Strain, value)
                                   }}/>
                        <NonPlayerActorDefenseCard npc={nemesis}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={10}>
                        <RatingCard rating={nemesis?.combat!!} type={RatingType.Combat}
                                    onChange={(value: number): void => {
                                        onChange(NonPlayerCharacterKey.Combat, value)
                                    }}/>
                        <RatingCard rating={nemesis?.social!!} type={RatingType.Social}
                                    onChange={(value: number): void => {
                                        onChange(NonPlayerCharacterKey.Social, value)
                                    }}/>
                        <RatingCard rating={nemesis?.general!!} type={RatingType.General}
                                    onChange={(value: number): void => {
                                        onChange(NonPlayerCharacterKey.General, value)
                                    }}/>
                    </Grid>
                    <Divider/>
                    <NemesisSkillCard nemesis={nemesis}/>
                    <Divider/>
                    <NemesisEquipmentCard nemesis={nemesis}/>
                    <Divider/>
                    <NemesisEquipmentCard nemesis={nemesis}/>
                    <Divider/>
                    <NemesisTalentCard nemesis={nemesis}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
