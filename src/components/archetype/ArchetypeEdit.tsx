import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Path} from "../../services/Path";
import CheckIcon from "@mui/icons-material/Check";
import EditSettingsCard from "../common/setting/EditSettingsCard";
import Setting from "../../models/Setting";
import Archetype from "../../models/actor/player/Archetype";
import ArchetypeService from "../../services/ArchetypeService";
import {EditNumberFieldCard} from "../common/ViewFieldCard";
import EditNumberCard from "../common/EditNumberCard";
import ArchetypeAbilityCard from "./ability/ArchetypeAbilityCard";

interface Props {
    arch: Archetype
    settings: Setting[]
}

export default function ArchetypeEdit(props: Props) {
    const {arch, settings} = props
    const {name} = useParams<{ name: string }>()
    const [archetype, setArchetype] = useState<Archetype>(arch)
    const [errors, setErrors] = useState({} as any)
    let navigate = useNavigate()

    useEffect(() => {
        setArchetype(arch)
    }, [arch])

    const onSettingAddition = async (setting: string) => {
        const copyArchetype = {...archetype} as Archetype
        copyArchetype.settings = copyArchetype.settings.concat(setting)
        await updateArchetype(copyArchetype)
    }

    const onSettingRemoval = async (setting: string) => {
        const copyArchetype = {...archetype} as Archetype
        copyArchetype.settings.forEach((set, index) => {
            if (set === setting) {
                copyArchetype.settings.splice(index, 1)
            }
        })
        await updateArchetype(copyArchetype)
    }

    const onChange = async (key: keyof Archetype, value: any) => {
        if (value === null || (archetype !== null && archetype[key] === value)) {
            return;
        }
        const copyArchetype = {...archetype} as Archetype
        switch (key) {
            case "brawn":
                copyArchetype.brawn = value
                break
            case "agility":
                copyArchetype.agility = value
                break
            case "cunning":
                copyArchetype.cunning = value
                break
            case "intellect":
                copyArchetype.intellect = value
                break
            case "presence":
                copyArchetype.presence = value
                break
            case "willpower":
                copyArchetype.willpower = value
                break
            case "wounds":
                copyArchetype.wounds = value
                break
            case "strain":
                copyArchetype.strain = value
                break
            case "experience":
                copyArchetype.experience = value
                break
            case 'name':
                copyArchetype.name = value
                break
        }

        await updateArchetype(copyArchetype)
    }

    const updateArchetype = async (copyArchetype: Archetype) => {
        setArchetype(copyArchetype)
        await ArchetypeService.updateArchetype(copyArchetype.name, copyArchetype)
    }

    const onView = () => {
        navigate(Path.Archetype + name + '/view');
    }

    return (
        <Card>
            <CardHeader title={archetype?.name!!} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <EditNumberFieldCard value={archetype?.brawn!!} title={'Brawn'} onChange={(value: number) => onChange('brawn', value)} min={1} max={6}/>
                    <EditNumberFieldCard value={archetype?.agility!!} title={'Agility'} onChange={(value: number) => onChange('agility', value)} min={1} max={6}/>
                    <EditNumberFieldCard value={archetype?.intellect!!} title={'Intellect'} onChange={(value: number) => onChange('intellect', value)} min={1} max={6}/>
                    <EditNumberFieldCard value={archetype?.cunning!!} title={'Cunning'} onChange={(value: number) => onChange('cunning', value)} min={1} max={6}/>
                    <EditNumberFieldCard value={archetype?.willpower!!} title={'Willpower'} onChange={(value: number) => onChange('willpower', value)} min={1} max={6}/>
                    <EditNumberFieldCard value={archetype?.presence!!} title={'Presence'} onChange={(value: number) => onChange('presence', value)} min={1} max={6}/>
                </Grid>
                <Divider/>
                <Grid container justifyContent={'center'}>
                    <EditNumberFieldCard value={archetype?.wounds!!} title={'Wounds'} onChange={(value: number) => onChange('wounds', value)} min={1} max={16}/>
                    <EditNumberFieldCard value={archetype?.strain!!} title={'Strain'} onChange={(value: number) => onChange('strain', value)} min={1} max={16}/>
                    <EditNumberCard title={'Starting Experience'} value={archetype?.experience!!} onChange={(value: number) => onChange('experience', value)}/>
                </Grid>
                <Divider/>
                <ArchetypeAbilityCard archetype={archetype!!}/>
                <Divider/>
                <EditSettingsCard names={archetype?.settings!!} onSettingAddition={onSettingAddition}
                                  onSettingRemoval={onSettingRemoval} settings={settings}/>
            </CardContent>
        </Card>
    )
}
