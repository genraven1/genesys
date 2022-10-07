import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { useState } from 'react';
import Talent, {Activation, Ranked, TalentKey, Tier} from '../../models/Talent';
import TalentService from '../../services/TalentService';
import { useParams } from 'react-router-dom';
import {InputTextFieldCard} from '../common/InputTextFieldCard';
import {Option} from '../common/InputSelectField';
import InputSelectFieldCard from "../common/InlineSelectFieldCard";

const getRankedOptions = (): Option[] => {
    return Object.values(Ranked).map((value) => ({value}))
}

const getActivationOptions = (): Option[] => {
    return Object.values(Activation).map((value) => ({value}))
}

const getTierOptions = (): Option[] => {
    return Object.values(Tier).map((value) => ({value}))
}

interface Props {
    tal: Talent
}

export default function TalentEdit(props: Props) {
    const {tal} = props
    const {name} = useParams<{ name: string }>()
    const [talent, setTalent] = useState<Talent>(tal)
    const [errors, setErrors] = useState({} as any)

    const onChange = async (key: keyof Talent, value: string) => {
        if (value.trim().length === 0 || (talent !== null && talent!![key] === value)) {
            return
        }
        const copyTalent = { ...talent } as Talent;
        switch (key) {
            case TalentKey.Summary:
                copyTalent.summary = value
                break
            case TalentKey.Description:
                copyTalent.description = value
                break
            case TalentKey.Ranked:
                copyTalent.ranked = value as Ranked
                break
            case TalentKey.Activation:
                copyTalent.activation = value as Activation
                break
            case TalentKey.Tier:
                copyTalent.tier = value as Tier
                break
        }
        setTalent(copyTalent)

        await TalentService.updateTalent(copyTalent.name, copyTalent)
    }

    return (
        <Card>
            <CardHeader title={name} />
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <InputTextFieldCard defaultValue={talent?.description!!} onCommit={(value: string): void => { onChange(TalentKey.Description, value) }} title={'Description'} helperText={'Description'} placeholder={'Description'} />
                    </Grid>
                    <Grid container spacing={10}>
                        <InputTextFieldCard defaultValue={talent?.summary!!} onCommit={(value: string): void => { onChange(TalentKey.Summary, value) }} title={'Player Summary'} helperText={'Summary'} placeholder={'Summary'} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <InputSelectFieldCard defaultValue={talent?.ranked!!} onCommit={(value: string): void => { onChange(TalentKey.Ranked, value) }} title={'Ranked'} options={getRankedOptions()} />
                        <InputSelectFieldCard defaultValue={talent?.activation!!} onCommit={(value: string): void => { onChange(TalentKey.Activation, value) }} title={'Activation'} options={getActivationOptions()} />
                        <InputSelectFieldCard defaultValue={talent?.tier!!} onCommit={(value: string): void => { onChange(TalentKey.Tier, value) }} title={'Tier'} options={getTierOptions()} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}