import {Card, CardContent, CardHeader, Checkbox, Divider, Grid, IconButton} from '@mui/material';
import {ChangeEvent, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import SkillService from '../../services/SkillService';
import Skill, {SkillKey, SkillType} from '../../models/actor/Skill';
import {Option} from '../common/InputSelectField';
import {CharacteristicType} from '../../models/actor/Characteristics';
import InputSelectFieldCard from "../common/InlineSelectFieldCard";
import {Path} from "../../services/Path";
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";

const getSkillTypes = (): Option[] => {
    return Object.values(SkillType).map((value) => ({value}))
}

const getCharacteristicTypes = (): Option[] => {
    let options = Object.values(CharacteristicType).map((value) => ({value}))
    return options
}

interface Props {
    sk: Skill
}

export default function SkillEdit(props: Props) {
    const {sk} = props
    const { name } = useParams<{ name: string }>()
    const [skill, setSkill] = useState<Skill>(sk)
    const [errors, setErrors] = useState({} as any)
    let navigate = useNavigate()

    const onChange = async (key: keyof Skill, value: any) => {
        if (value === null || (skill !== null && skill[key] === value)) {
            return;
        }
        const copySkill = {...skill} as Skill
        switch (key) {
            case 'active':
                copySkill.active = value;
                break
            case 'characteristic':
                copySkill.characteristic = value
                break
            case 'type':
                copySkill.type = value
                break
            case 'name':
                copySkill.name = value
                break
        }

        await updateSkill(copySkill)
    }

    const handleActiveClick = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value
        if (value === 'on') {
            onChange(SkillKey.Active, true)
        }
        else {
            onChange(SkillKey.Active, false)
        }
    }

    const updateSkill = async (copySkill: Skill) => {
        setSkill(copySkill)
        await SkillService.updateSkill(copySkill.name, copySkill)
    }

    const onView = () => {
        navigate(Path.Skills + name + '/view');
    }

    return (
        <Card>
            <CardHeader title={name} style={{ textAlign: 'center' }} action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                <CheckIcon color='primary' fontSize='small' />
            </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <InputSelectFieldCard defaultValue={skill?.type!!} onCommit={(value: string): void => { onChange(SkillKey.Type, value) }} title={'Skill Type'} options={getSkillTypes()} />
                    <InputSelectFieldCard defaultValue={skill?.characteristic!!} onCommit={(value: string): void => { onChange(SkillKey.Characteristic, value) }} title={'Linked Characteristic'} options={getCharacteristicTypes()} />
                    <Grid item xs>
                        <CardHeader title={'Active'} style={{ textAlign: 'center' }} />
                        <Divider />
                        <Checkbox onChange={handleActiveClick} checked={skill?.active!!}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
