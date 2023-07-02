import {Button, Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import {CharacteristicType} from "../../../../models/actor/Characteristics";
import {DefenseType} from "../../../../models/actor/Defense";
import {StatsType} from "../../../../models/actor/Stats";
import EditCharacteristicCard from "../../EditCharacteristicCard";
import RatingCard from "../RatingCard";
import {NonPlayerCharacterKey, RatingType} from "../../../../models/actor/npc/NonPlayerCharacter";
import SoakCard from "../../SoakCard";
import StatsCard from "../../StatsCard";
import DefenseCard from "../../DefenseCard";
import * as React from "react";
import {ActorPath} from "../../../../services/Path";
import CheckIcon from "@mui/icons-material/Check";
import TalentSelectionDialog from "../../common/talent/TalentSelectionDialog";
import NonPlayerCharacterTalentTable from "../talent/NonPlayerCharacterTalentTable";
import {ActorKey} from "../../../../models/actor/Actor";
import Minion from "../../../../models/actor/npc/Minion";
import NonPlayerCharacterEquipmentCard from "../equipment/NonPlayerCharacterEquipmentCard";
import NonPlayerCharacterAbilityCard from "../ability/NonPlayerCharacterAbilityCard";
import Setting from "../../../../models/Setting";
import EditSettingsCard from "../../../common/setting/EditSettingsCard";
import NonPlayerCharacterSkillCard from "../skill/NonPlayerCharacterSkillCard";

interface Props {
    min: Minion
    settings: Setting[]
}

export default function MinionEdit(props: Props) {
    const {min, settings} = props
    const {name} = useParams<{ name: string }>()
    const [minion, setMinion] = useState<Minion>(min)
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false)
    const [errors, setErrors] = useState({} as any)
    let navigate = useNavigate()

    useEffect(() => {
        setMinion(min)
    }, [min])

    const onSettingAddition = async (setting: string) => {
        const copyMinion = {...minion} as Minion
        copyMinion.settings = copyMinion.settings.concat(setting)
        await updateMinion(copyMinion)
    }

    const onSettingRemoval = async (setting: string) => {
        const copyMinion = {...minion} as Minion
        copyMinion.settings.forEach((set, index) => {
            if (set === setting) {
                copyMinion.settings.splice(index, 1)
            }
        })
        await updateMinion(copyMinion)
    }

    const onChange = async (key: keyof Minion, value: number) => {
        if (value === null) {
            return
        }
        const copyMinion = {...minion} as Minion
        switch (key) {
            case "brawn":
                copyMinion.brawn.current = value
                break
            case "agility":
                copyMinion.agility.current = value
                break
            case "intellect":
                copyMinion.intellect.current = value
                break
            case "cunning":
                copyMinion.cunning.current = value
                break
            case "willpower":
                copyMinion.willpower.current = value
                break
            case "presence":
                copyMinion.presence.current = value
                break
            case "melee":
                copyMinion.melee.current = value
                break
            case "ranged":
                copyMinion.ranged.current = value
                break
            case "wounds":
                copyMinion.wounds.max = value
                break
            case "combat":
                copyMinion.combat = value
                break
            case "social":
                copyMinion.social = value
                break
            case "general":
                copyMinion.general = value
                break
            default:
                break
        }

        await updateMinion(copyMinion)
    }

    const updateMinion = async (copyMinion: Minion) => {
        copyMinion.soak = copyMinion.brawn.current
        setMinion(copyMinion)
        await ActorService.updateMinion(copyMinion.name, copyMinion)
    }

    const onView = () => {
        navigate(ActorPath.Minion + name + '/view')
    }

    return (
        <Card>
            <CardHeader title={name} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}/>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <EditCharacteristicCard characteristic={minion?.brawn!!} type={CharacteristicType.Brawn}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Brawn, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={minion?.agility!!} type={CharacteristicType.Agility}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Agility, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={minion?.intellect!!} type={CharacteristicType.Intellect}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Intellect, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={minion?.cunning!!} type={CharacteristicType.Cunning}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Cunning, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={minion?.willpower!!} type={CharacteristicType.Willpower}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Willpower, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={minion?.presence!!} type={CharacteristicType.Presence}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Presence, value)
                                                }}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={10}>
                        <SoakCard soak={minion?.soak!!}/>
                        <StatsCard stats={minion?.wounds!!} type={StatsType.Wounds} onChange={(value: number): void => {
                            onChange(ActorKey.Wounds, value)
                        }}/>
                        <DefenseCard defense={minion?.melee!!} type={DefenseType.Melee}
                                     onChange={(value: number): void => {
                                         onChange(ActorKey.Melee, value)
                                     }}/>
                        <DefenseCard defense={minion?.ranged!!} type={DefenseType.Ranged}
                                     onChange={(value: number): void => {
                                         onChange(ActorKey.Ranged, value)
                                     }}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={10}>
                        <RatingCard rating={minion?.combat!!} type={RatingType.Combat}
                                    onChange={(value: number): void => {
                                        onChange(NonPlayerCharacterKey.Combat, value)
                                    }}/>
                        <RatingCard rating={minion?.social!!} type={RatingType.Social}
                                    onChange={(value: number): void => {
                                        onChange(NonPlayerCharacterKey.Social, value)
                                    }}/>
                        <RatingCard rating={minion?.general!!} type={RatingType.General}
                                    onChange={(value: number): void => {
                                        onChange(NonPlayerCharacterKey.General, value)
                                    }}/>
                    </Grid>
                    <Divider/>
                    <NonPlayerCharacterSkillCard npc={minion}/>
                    <Divider/>
                    <NonPlayerCharacterEquipmentCard npc={minion}/>
                    <Divider/>
                    <NonPlayerCharacterAbilityCard npc={minion}/>
                    <Divider/>
                    <Button onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                    {openSelectTalentDialog && <TalentSelectionDialog actor={minion} open={openSelectTalentDialog}
                                                                      onClose={(): void => setOpenSelectTalentDialog(false)}/>}
                    <NonPlayerCharacterTalentTable npc={minion}/>
                </Grid>
                <EditSettingsCard names={minion?.settings!!} onSettingAddition={onSettingAddition}
                                  onSettingRemoval={onSettingRemoval} settings={settings}/>
            </CardContent>
        </Card>
    )
}
