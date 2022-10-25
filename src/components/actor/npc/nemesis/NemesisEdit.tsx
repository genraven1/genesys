import {Button, Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material"
import * as React from "react"
import {useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import ActorService from "../../../../services/ActorService"
import Nemesis, {NemesisKey} from "../../../../models/actor/npc/Nemesis"
import {CharacteristicType} from "../../../../models/actor/Characteristics"
import {DefenseType} from "../../../../models/actor/Defense"
import {StatsType} from "../../../../models/actor/Stats"
import EditCharacteristicCard from "../../EditCharacteristicCard"
import RatingCard from "../RatingCard"
import {RatingType} from "../../../../models/actor/npc/NonPlayerCharacter"
import SoakCard from "../../SoakCard"
import StatsCard from "../../StatsCard"
import DefenseCard from "../../DefenseCard"
import SkillTable from "./NemesisSkillTable"
import NemesisTalentTable from "./NemesisTalentTable"
import NPCTalentSelectionDialog from "../NPCTalentSelectionDialog"
import {Path} from "../../../../services/Path"
import CheckIcon from '@mui/icons-material/Check'

export default function NemesisEdit(props: {nem: Nemesis}) {
    const {nem} = props
    const { name } = useParams<{ name: string }>()
    const [nemesis, setNemesis] = useState<Nemesis>(nem)
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false)
    const [errors, setErrors] = useState({} as any)
    let navigate = useNavigate()

    const onChange = async (key: keyof Nemesis, value: number) => {
        if (value === null || (nemesis !== null && nemesis[key] === value)) {
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
            case "soak":
                copyNemesis.soak = copyNemesis.brawn.current
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
        navigate(Path.Nemesis + name + '/view')
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
                        <EditCharacteristicCard characteristic={nemesis?.brawn!!} type={CharacteristicType.Brawn} onChange={(value: number): void => { onChange(NemesisKey.Brawn, value) }}/>
                        <EditCharacteristicCard characteristic={nemesis?.agility!!} type={CharacteristicType.Agility} onChange={(value: number): void => { onChange(NemesisKey.Agility, value) }}/>
                        <EditCharacteristicCard characteristic={nemesis?.intellect!!} type={CharacteristicType.Intellect} onChange={(value: number): void => { onChange(NemesisKey.Intellect, value) }}/>
                        <EditCharacteristicCard characteristic={nemesis?.cunning!!} type={CharacteristicType.Cunning} onChange={(value: number): void => { onChange(NemesisKey.Cunning, value) }}/>
                        <EditCharacteristicCard characteristic={nemesis?.willpower!!} type={CharacteristicType.Willpower} onChange={(value: number): void => { onChange(NemesisKey.Willpower, value) }}/>
                        <EditCharacteristicCard characteristic={nemesis?.presence!!} type={CharacteristicType.Presence} onChange={(value: number): void => { onChange(NemesisKey.Presence, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <SoakCard soak={nemesis?.soak!!} />
                        <StatsCard stats={nemesis?.wounds!!} type={StatsType.Wounds} onChange={(value: number): void => { onChange(NemesisKey.Wounds, value) }}/>
                        <StatsCard stats={nemesis?.strain!!} type={StatsType.Strain} onChange={(value: number): void => { onChange(NemesisKey.Strain, value) }}/>
                        <DefenseCard defense={nemesis?.melee!!} type={DefenseType.Melee} onChange={(value: number): void => { onChange(NemesisKey.Melee, value) }}/>
                        <DefenseCard defense={nemesis?.ranged!!} type={DefenseType.Ranged} onChange={(value: number): void => { onChange(NemesisKey.Ranged, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <RatingCard  rating={nemesis?.combat!!} type={RatingType.Combat} onChange={(value: number): void => { onChange(NemesisKey.Combat, value) }}/>
                        <RatingCard  rating={nemesis?.social!!} type={RatingType.Social} onChange={(value: number): void => { onChange(NemesisKey.Social, value) }}/>
                        <RatingCard  rating={nemesis?.general!!} type={RatingType.General} onChange={(value: number): void => { onChange(NemesisKey.General, value) }}/>
                    </Grid>
                    <Divider />
                    <SkillTable  nemesis={nemesis}/>
                    <Divider />
                    <Button onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                    {openSelectTalentDialog && <NPCTalentSelectionDialog nemesis={nemesis} open={openSelectTalentDialog} onClose={(): void => setOpenSelectTalentDialog(false)}/>}
                    <NemesisTalentTable nemesis={nemesis}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
