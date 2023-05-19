import {Button, Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material"
import * as React from "react"
import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import ActorService from "../../../../services/ActorService"
import Nemesis from "../../../../models/actor/npc/Nemesis"
import {CharacteristicType} from "../../../../models/actor/Characteristics"
import {DefenseType} from "../../../../models/actor/Defense"
import {StatsType} from "../../../../models/actor/Stats"
import EditCharacteristicCard from "../../EditCharacteristicCard"
import RatingCard from "../RatingCard"
import {NonPlayerCharacterKey, RatingType} from "../../../../models/actor/npc/NonPlayerCharacter"
import SoakCard from "../../SoakCard"
import StatsCard from "../../StatsCard"
import DefenseCard from "../../DefenseCard"
import NonPlayerCharacterSkillTable from "../skill/NonPlayerCharacterSkillTable"
import NonPlayerCharacterTalentTable from "../talent/NonPlayerCharacterTalentTable"
import TalentSelectionDialog from "../../TalentSelectionDialog"
import {ActorPath} from "../../../../services/Path"
import CheckIcon from '@mui/icons-material/Check'
import { ActorKey } from "../../../../models/actor/Actor"
import NonPlayerCharacterEquipmentCard from "../equipment/NonPlayerCharacterEquipmentCard";

export default function NemesisEdit(props: {nem: Nemesis}) {
    const {nem} = props
    const { name } = useParams<{ name: string }>()
    const [nemesis, setNemesis] = useState<Nemesis>(nem)
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false)
    const [errors, setErrors] = useState({} as any)
    let navigate = useNavigate()

    useEffect(() => {setNemesis(nem)}, [nem])

    const onChange = async (key: keyof Nemesis, value: number) => {
        if (value === null) {
            return
        }
        const copyNemesis = {...nemesis} as Nemesis
        switch (key) {
            case "brawn":
                copyNemesis.brawn.current = value
                break
            case "agility":
                copyNemesis.agility.current = value
                break
            case "intellect":
                copyNemesis.intellect.current = value
                break
            case "cunning":
                copyNemesis.cunning.current = value
                break
            case "willpower":
                copyNemesis.willpower.current = value
                break
            case "presence":
                copyNemesis.presence.current = value
                break
            case "melee":
                copyNemesis.melee.current = value
                break
            case "ranged":
                copyNemesis.ranged.current = value
                break
            case "wounds":
                copyNemesis.wounds.max = value
                break
            case "strain":
                copyNemesis.strain.max = value
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

    const updateNemesis = async (copyNemesis: Nemesis): Promise<Nemesis> => {
        copyNemesis.soak = copyNemesis.brawn.current
        setNemesis(copyNemesis)
        await ActorService.updateNemesis(copyNemesis.name, copyNemesis)
        return nemesis!!
    }

    const onView = () => {
        navigate(ActorPath.Nemesis + name + '/view')
    }

    return (
        <Card>
            <CardHeader title={name} style={{ textAlign: 'center' }} action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                <CheckIcon color='primary' fontSize='small' />
            </IconButton>}/>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <EditCharacteristicCard characteristic={nemesis?.brawn!!} type={CharacteristicType.Brawn} onChange={(value: number): void => { onChange(ActorKey.Brawn, value) }}/>
                        <EditCharacteristicCard characteristic={nemesis?.agility!!} type={CharacteristicType.Agility} onChange={(value: number): void => { onChange(ActorKey.Agility, value) }}/>
                        <EditCharacteristicCard characteristic={nemesis?.intellect!!} type={CharacteristicType.Intellect} onChange={(value: number): void => { onChange(ActorKey.Intellect, value) }}/>
                        <EditCharacteristicCard characteristic={nemesis?.cunning!!} type={CharacteristicType.Cunning} onChange={(value: number): void => { onChange(ActorKey.Cunning, value) }}/>
                        <EditCharacteristicCard characteristic={nemesis?.willpower!!} type={CharacteristicType.Willpower} onChange={(value: number): void => { onChange(ActorKey.Willpower, value) }}/>
                        <EditCharacteristicCard characteristic={nemesis?.presence!!} type={CharacteristicType.Presence} onChange={(value: number): void => { onChange(ActorKey.Presence, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <SoakCard soak={nemesis?.soak!!} />
                        <StatsCard stats={nemesis?.wounds!!} type={StatsType.Wounds} onChange={(value: number): void => { onChange(ActorKey.Wounds, value) }}/>
                        <StatsCard stats={nemesis?.strain!!} type={StatsType.Strain} onChange={(value: number): void => { onChange(ActorKey.Strain, value) }}/>
                        <DefenseCard defense={nemesis?.melee!!} type={DefenseType.Melee} onChange={(value: number): void => { onChange(ActorKey.Melee, value) }}/>
                        <DefenseCard defense={nemesis?.ranged!!} type={DefenseType.Ranged} onChange={(value: number): void => { onChange(ActorKey.Ranged, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <RatingCard  rating={nemesis?.combat!!} type={RatingType.Combat} onChange={(value: number): void => { onChange(NonPlayerCharacterKey.Combat, value) }}/>
                        <RatingCard  rating={nemesis?.social!!} type={RatingType.Social} onChange={(value: number): void => { onChange(NonPlayerCharacterKey.Social, value) }}/>
                        <RatingCard  rating={nemesis?.general!!} type={RatingType.General} onChange={(value: number): void => { onChange(NonPlayerCharacterKey.General, value) }}/>
                    </Grid>
                    <Divider />
                    <NonPlayerCharacterSkillTable npc={nemesis}/>
                    <Divider/>
                    <NonPlayerCharacterEquipmentCard npc={nemesis}/>
                    <Divider />
                    <Button onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                    {openSelectTalentDialog && <TalentSelectionDialog actor={nemesis} open={openSelectTalentDialog} onClose={(): void => setOpenSelectTalentDialog(false)}/>}
                    <NonPlayerCharacterTalentTable npc={nemesis}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
