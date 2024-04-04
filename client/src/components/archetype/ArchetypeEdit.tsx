import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";
import Archetype from "../../models/actor/player/Archetype";
import SettingService from "../../services/SettingService";
import ArchetypeService from "../../services/ArchetypeService";
import {Path} from "../../services/Path";
import {EditCharacteristicCard} from "../actor/CharacteristicCard";
import {CharacteristicType} from "../../models/character/Characteristic";
import {ActorKey} from "../../models/actor/Actor";
import EditSettingsCard from "../common/setting/EditSettingsCard";
import {useFetchAllSettings} from "../setting/SettingWorkflow";

interface Props {
    arch: Archetype
}

export default function ArchetypeEdit(props: Props) {
    const {arch} = props
    const [archetype, setArchetype] = useState<Archetype>(arch)

    let navigate = useNavigate()

    useEffect(() => {
        setArchetype(arch)
    }, [arch])

    const onSettingAddition = async (name: string) => {
        const copyArchetype = {...archetype} as Archetype
        let setting = await SettingService.getSetting(name)
        copyArchetype.settings = copyArchetype.settings.concat(setting)
        await updateArchetype(copyArchetype)
    }

    const onSettingRemoval = async (name: string) => {
        const copyArchetype = {...archetype} as Archetype
        copyArchetype.settings.forEach((set, index) => {
            if (set.name === name) {
                copyArchetype.settings.splice(index, 1)
            }
        })
        await updateArchetype(copyArchetype)
    }

    const onChange = async (key: keyof Archetype, value: number) => {
        if (value === null || (archetype !== null && archetype[key] === value)) {
            return;
        }
        const copyArchetype = {...archetype} as Archetype
        switch (key) {
            case 'brawn':
                copyArchetype.brawn = value
                break;
            case 'agility':
                copyArchetype.agility = value
                break;
            case 'intellect':
                copyArchetype.intellect = value
                break;
            case 'cunning':
                copyArchetype.cunning = value
                break;
            case 'willpower':
                copyArchetype.willpower = value
                break;
            case 'presence':
                copyArchetype.presence = value
                break;
            case 'wounds':
                copyArchetype.wounds = value
                break
            case 'strain':
                copyArchetype.strain = value
                break
            default:
                break
        }

        await updateArchetype(copyArchetype)
    }

    const updateArchetype = async (copyArchetype: Archetype) => {
        setArchetype(copyArchetype)
        await ArchetypeService.updateArchetype(copyArchetype.name, copyArchetype)
    }

    const onView = () => {
        navigate(Path.Archetype + archetype.name + '/view')
    }

    return (
        <Card>
            <CardHeader title={archetype.name} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}/>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <EditCharacteristicCard characteristic={archetype?.brawn!!} type={CharacteristicType.Brawn}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Brawn, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={archetype?.agility!!} type={CharacteristicType.Agility}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Agility, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={archetype?.intellect!!} type={CharacteristicType.Intellect}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Intellect, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={archetype?.cunning!!} type={CharacteristicType.Cunning}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Cunning, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={archetype?.willpower!!} type={CharacteristicType.Willpower}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Willpower, value)
                                                }}/>
                        <EditCharacteristicCard characteristic={archetype?.presence!!} type={CharacteristicType.Presence}
                                                onChange={(value: number): void => {
                                                    onChange(ActorKey.Presence, value)
                                                }}/>
                    </Grid>
                </Grid>
                <EditSettingsCard settings={archetype.settings} onSettingAddition={onSettingAddition}
                                  onSettingRemoval={onSettingRemoval} allSettings={useFetchAllSettings()}/>
            </CardContent>
        </Card>
    )
}
