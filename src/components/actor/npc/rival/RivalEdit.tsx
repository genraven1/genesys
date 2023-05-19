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
import Rival from "../../../../models/actor/npc/Rival";
import {ActorPath} from "../../../../services/Path";
import CheckIcon from "@mui/icons-material/Check";
import TalentSelectionDialog from "../../TalentSelectionDialog";
import NonPlayerCharacterTalentTable from "../talent/NonPlayerCharacterTalentTable";
import {ActorKey} from "../../../../models/actor/Actor";
import NonPlayerCharacterSkillTable from "../skill/NonPlayerCharacterSkillTable";

export default function RivalEdit(props: {riv: Rival}) {
    const {riv} = props
    const { name } = useParams<{ name: string }>()
    const [rival, setRival] = useState<Rival>(riv)
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false)
    const [errors, setErrors] = useState({} as any)
    let navigate = useNavigate()

    useEffect(() => {setRival(riv)}, [riv])

    const onChange = async (key: keyof Rival, value: number) => {
        if (value === null) {
            return
        }
        const copyRival = {...rival} as Rival
        switch (key) {
            case "brawn":
                copyRival.brawn.current = value
                break
            case "agility":
                copyRival.agility.current = value
                break
            case "intellect":
                copyRival.intellect.current = value
                break
            case "cunning":
                copyRival.cunning.current = value
                break
            case "willpower":
                copyRival.willpower.current = value
                break
            case "presence":
                copyRival.presence.current = value
                break
            case "melee":
                copyRival.melee.current = value
                break
            case "ranged":
                copyRival.ranged.current = value
                break
            case "wounds":
                copyRival.wounds.max = value
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

    const updateRival = async (copyRival: Rival): Promise<Rival> => {
        copyRival.soak = copyRival.brawn.current
        setRival(copyRival)
        await ActorService.updateRival(copyRival.name, copyRival)
        return rival!!
    }

    const onView = () => {
        navigate(ActorPath.Rival + name + '/view')
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
                        <EditCharacteristicCard characteristic={rival?.brawn!!} type={CharacteristicType.Brawn} onChange={(value: number): void => { onChange(ActorKey.Brawn, value) }}/>
                        <EditCharacteristicCard characteristic={rival?.agility!!} type={CharacteristicType.Agility} onChange={(value: number): void => { onChange(ActorKey.Agility, value) }}/>
                        <EditCharacteristicCard characteristic={rival?.intellect!!} type={CharacteristicType.Intellect} onChange={(value: number): void => { onChange(ActorKey.Intellect, value) }}/>
                        <EditCharacteristicCard characteristic={rival?.cunning!!} type={CharacteristicType.Cunning} onChange={(value: number): void => { onChange(ActorKey.Cunning, value) }}/>
                        <EditCharacteristicCard characteristic={rival?.willpower!!} type={CharacteristicType.Willpower} onChange={(value: number): void => { onChange(ActorKey.Willpower, value) }}/>
                        <EditCharacteristicCard characteristic={rival?.presence!!} type={CharacteristicType.Presence} onChange={(value: number): void => { onChange(ActorKey.Presence, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <SoakCard soak={rival?.soak!!} />
                        <StatsCard stats={rival?.wounds!!} type={StatsType.Wounds} onChange={(value: number): void => { onChange(ActorKey.Wounds, value) }}/>
                        <DefenseCard defense={rival?.melee!!} type={DefenseType.Melee} onChange={(value: number): void => { onChange(ActorKey.Melee, value) }}/>
                        <DefenseCard defense={rival?.ranged!!} type={DefenseType.Ranged} onChange={(value: number): void => { onChange(ActorKey.Ranged, value) }}/>
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <RatingCard  rating={rival?.combat!!} type={RatingType.Combat} onChange={(value: number): void => { onChange(NonPlayerCharacterKey.Combat, value) }}/>
                        <RatingCard  rating={rival?.social!!} type={RatingType.Social} onChange={(value: number): void => { onChange(NonPlayerCharacterKey.Social, value) }}/>
                        <RatingCard  rating={rival?.general!!} type={RatingType.General} onChange={(value: number): void => { onChange(NonPlayerCharacterKey.General, value) }}/>
                    </Grid>
                    <Divider />
                    <NonPlayerCharacterSkillTable npc={rival}/>
                    <Divider />
                    <Button onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                    {openSelectTalentDialog && <TalentSelectionDialog actor={rival} open={openSelectTalentDialog} onClose={(): void => setOpenSelectTalentDialog(false)}/>}
                    <NonPlayerCharacterTalentTable npc={rival}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
