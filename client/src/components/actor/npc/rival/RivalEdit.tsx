import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import {CharacteristicType} from "../../../../models/actor/Characteristics";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import {EditCharacteristicCard} from "../../CharacteristicCard";
import RatingCard from "../RatingCard";
import {NonPlayerCharacterKey, RatingType} from "../../../../models/actor/npc/NonPlayerActor";
import SoakCard from "../../SoakCard";
import {EditStatsCard} from "../../StatsCard";
import {EditDefenseCard} from "../../DefenseCard";
import * as React from "react";
import Rival from "../../../../models/actor/npc/Rival";
import {ActorPath} from "../../../../services/Path";
import CheckIcon from "@mui/icons-material/Check";
import {ActorKey} from "../../../../models/actor/Actor";
import NonPlayerCharacterEquipmentCard from "../equipment/NonPlayerCharacterEquipmentCard";
import NonPlayerCharacterAbilityCard from "../ability/NonPlayerCharacterAbilityCard";
import Setting from "../../../../models/Setting";
import EditSettingsCard from "../../../common/setting/EditSettingsCard";
import SettingService from "../../../../services/SettingService";
import NonPlayerCharacterSkillCard from "../skill/NonPlayerCharacterSkillCard";
import NonPlayerCharacterTalentCard from "../talent/NonPlayerCharacterTalentCard";

interface Props {
    riv: Rival
    settings: Setting[]
}

export default function RivalEdit(props: Props) {
    const {riv, settings} = props
    const { id } = useParams<{ id: string }>()
    const [rival, setRival] = useState<Rival>(riv)
    let navigate = useNavigate()

    useEffect(() => {setRival(riv)}, [riv])

    const onSettingAddition = async (id: number) => {
        const copyRival = {...rival} as Rival
        let setting = await SettingService.getSetting(id)
        copyRival.settings = copyRival.settings.concat(setting)
        await updateRival(copyRival)
    }

    const onSettingRemoval = async (id: number) => {
        const copyRival = {...rival} as Rival
        copyRival.settings.forEach((set, index) => {
            if (set.id === id) {
                copyRival.settings.splice(index, 1)
            }
        })
        await updateRival(copyRival)
    }

    const onChange = async (key: keyof Rival, value: number) => {
        if (value === null) {
            return
        }
        const copyRival = {...rival} as Rival
        switch (key) {
            case "brawn":
                copyRival.brawn = value
                break
            case "agility":
                copyRival.agility = value
                break
            case "intellect":
                copyRival.intellect = value
                break
            case "cunning":
                copyRival.cunning = value
                break
            case "willpower":
                copyRival.willpower = value
                break
            case "presence":
                copyRival.presence = value
                break
            case "melee":
                copyRival.melee = value
                break
            case "ranged":
                copyRival.ranged = value
                break
            case "wounds":
                copyRival.wounds = value
                break
            case "combat":
                copyRival.combat = value
                break
            case "social":
                copyRival.social = value
                break
            case "general":
                copyRival.general = value
                break
            default:
                break
        }

        await updateRival(copyRival)
    }

    const updateRival = async (copyRival: Rival) => {
        copyRival.soak = copyRival.brawn
        setRival(copyRival)
        await ActorService.updateRival(copyRival.name, copyRival)
    }

    const onView = () => {
        navigate(ActorPath.Rival + id + '/view')
    }

    return (
        <Card>
            <CardHeader title={rival?.name!!} style={{ textAlign: 'center' }} action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                <CheckIcon color='primary' fontSize='small' />
            </IconButton>}/>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <EditCharacteristicCard characteristic={rival?.brawn!!} type={CharacteristicType.Brawn} onChange={(value: number): void => { onChange(ActorKey.Brawn, value) }}/>
                        <EditCharacteristicCard characteristic={rival?.agility!!} type={CharacteristicType.Agility} onChange={(value: number): void => { onChange(ActorKey.Agility, value) }}/>
                        <EditCharacteristicCard characteristic={rival?.intellect!!} type={CharacteristicType.Intellect} onChange={(value: number): void => { onChange(ActorKey.Intellect, value) }}/>
                        <EditCharacteristicCard characteristic={rival?.cunning!!} type={CharacteristicType.Cunning} onChange={(value: number): void => { onChange(ActorKey.Cunning, value) }}/>
                        <EditCharacteristicCard characteristic={rival?.willpower!!} type={CharacteristicType.Willpower} onChange={(value: number): void => { onChange(ActorKey.Willpower, value) }}/>
                        <EditCharacteristicCard characteristic={rival?.presence!!} type={CharacteristicType.Presence} onChange={(value: number): void => { onChange(ActorKey.Presence, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={2}>
                        <SoakCard soak={rival?.soak!!} />
                        <EditStatsCard stats={rival?.wounds!!} type={StatsType.Wounds} onChange={(value: number): void => { onChange(ActorKey.Wounds, value) }}/>
                        <EditDefenseCard defense={rival?.melee!!} type={DefenseType.Melee} onChange={(value: number): void => { onChange(ActorKey.Melee, value) }}/>
                        <EditDefenseCard defense={rival?.ranged!!} type={DefenseType.Ranged} onChange={(value: number): void => { onChange(ActorKey.Ranged, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <RatingCard  rating={rival?.combat!!} type={RatingType.Combat} onChange={(value: number): void => { onChange(NonPlayerCharacterKey.Combat, value) }}/>
                        <RatingCard  rating={rival?.social!!} type={RatingType.Social} onChange={(value: number): void => { onChange(NonPlayerCharacterKey.Social, value) }}/>
                        <RatingCard  rating={rival?.general!!} type={RatingType.General} onChange={(value: number): void => { onChange(NonPlayerCharacterKey.General, value) }}/>
                    </Grid>
                    <Divider/>
                    <NonPlayerCharacterSkillCard npc={rival}/>
                    <Divider/>
                    <NonPlayerCharacterEquipmentCard npc={rival}/>
                    <Divider/>
                    <NonPlayerCharacterAbilityCard npc={rival}/>
                    <Divider/>
                    <NonPlayerCharacterTalentCard npc={rival}/>
                </Grid>
                <EditSettingsCard settings={rival?.settings!!} onSettingAddition={onSettingAddition}
                                  onSettingRemoval={onSettingRemoval} allSettings={settings}/>
            </CardContent>
        </Card>
    )
}
