import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useEffect, useState} from 'react';
import Talent, {Activation, getActivationOptions, getTierOptions, Tier} from '../../models/Talent';
import TalentService from '../../services/TalentService';
import {useNavigate, useParams} from 'react-router-dom';
import {InputTextFieldCard} from '../common/InputTextFieldCard';
import InputSelectFieldCard from "../common/InlineSelectFieldCard";
import {Path} from "../../services/Path";
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";
import Setting from "../../models/Setting";
import CheckButtonCard from "../common/CheckButtonCard";
import EditSettingsCard from "../common/setting/EditSettingsCard";
import SettingService from "../../services/SettingService";

interface Props {
    tal: Talent
    settings: Setting[]
}

export default function TalentEdit(props: Props) {
    const {tal, settings} = props
    const {name} = useParams<{ name: string }>()
    const [talent, setTalent] = useState<Talent>(tal)
    let navigate = useNavigate()

    useEffect(() => {setTalent(tal)}, [tal])

    const onSettingAddition = async (id: number) => {
        const copyTalent = {...talent} as Talent
        let setting = await SettingService.getSetting(id)
        copyTalent.settings = copyTalent.settings.concat(setting)
        await updateTalent(copyTalent)
    }

    const onSettingRemoval = async (id: number) => {
        const copyTalent = {...talent} as Talent
        copyTalent.settings.forEach((set, index) => {
            if (set.id === id) {
                copyTalent.settings.splice(index, 1)
            }
        })
        await updateTalent(copyTalent)
    }

    const onChange = async (key: keyof Talent, value: string) => {
        if (value.trim().length === 0 || (talent !== null && talent!![key] === value)) {
            return
        }
        const copyTalent = { ...talent } as Talent;
        switch (key) {
            case 'summary':
                copyTalent.summary = value
                break
            case 'description':
                copyTalent.description = value
                break
            case 'ranked':
                copyTalent.ranked = !Boolean(copyTalent.ranked)
                break
            case 'activation':
                copyTalent.activation = value as Activation
                break
            case 'tier':
                copyTalent.tier = value as Tier
                break
        }
        await updateTalent(copyTalent)
    }

    const updateTalent = async (copyTalent: Talent) => {
        setTalent(copyTalent)
        await TalentService.updateTalent(copyTalent.name, copyTalent)
    }

    const onView = () => {
        navigate(Path.Talent + name!! + '/view');
    }

    return (
        <Card>
            <CardHeader title={talent?.name!!} style={{ textAlign: 'center' }} action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                <CheckIcon color='primary' fontSize='small' />
            </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <InputTextFieldCard defaultValue={talent?.description!!} onCommit={(value: string): void => { onChange('description', value) }} title={'Description'} helperText={'Description'} placeholder={'Description'} />
                    </Grid>
                    <Grid container spacing={10}>
                        <InputTextFieldCard defaultValue={talent?.summary!!} onCommit={(value: string): void => { onChange('summary', value) }} title={'Player Summary'} helperText={'Summary'} placeholder={'Summary'} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <CheckButtonCard title={'Ranked Talent'} value={talent?.ranked!!} onChange={(value: boolean): void => {onChange('ranked', String(value))}} />
                        <InputSelectFieldCard defaultValue={talent?.activation!!} onCommit={(value: string): void => { onChange('activation', value) }} title={'Activation'} options={getActivationOptions()} />
                        <InputSelectFieldCard defaultValue={talent?.tier!!} onCommit={(value: string): void => { onChange('tier', value) }} title={'Tier'} options={getTierOptions()} />
                    </Grid>
                    <EditSettingsCard settings={talent?.settings!!} onSettingAddition={onSettingAddition} onSettingRemoval={onSettingRemoval} allSettings={settings}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
