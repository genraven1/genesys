import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import SkillService from '../../services/SkillService';
import Skill, {SkillType} from '../../models/actor/Skill';
import {Option} from '../common/InputSelectField';
import {CharacteristicType} from '../../models/actor/Characteristics';
import InputSelectFieldCard from "../common/InlineSelectFieldCard";
import {Path} from "../../services/Path";
import CheckIcon from "@mui/icons-material/Check";
import EditSettingsCard from "../common/setting/EditSettingsCard";
import Setting from "../../models/Setting";

const getSkillTypes = (): Option[] => {
    return Object.values(SkillType).map((value) => ({value}))
}

const getCharacteristicTypes = (): Option[] => {
    return Object.values(CharacteristicType).map((value) => ({value}))
}

interface Props {
    sk: Skill
    settings: Setting[]
}

export default function SkillEdit(props: Props) {
    const {sk, settings} = props
    const {name} = useParams<{ name: string }>()
    const [skill, setSkill] = useState<Skill>(sk)

    let navigate = useNavigate()

    useEffect(() => {
        setSkill(sk)
    }, [sk])

    const onSettingAddition = async (setting: string) => {
        const copySkill = {...skill} as Skill
        copySkill.settings = copySkill.settings.concat(setting)
        await updateSkill(copySkill)
    }

    const onSettingRemoval = async (setting: string) => {
        const copySkill = {...skill} as Skill
        copySkill.settings.forEach((set, index) => {
            if (set === setting) {
                copySkill.settings.splice(index, 1)
            }
        })
        await updateSkill(copySkill)
    }

    const onChange = async (key: keyof Skill, value: any) => {
        if (value === null || (skill !== null && skill[key] === value)) {
            return;
        }
        const copySkill = {...skill} as Skill
        switch (key) {
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

    const updateSkill = async (copySkill: Skill) => {
        setSkill(copySkill)
        await SkillService.updateSkill(copySkill.name, copySkill)
    }

    const onView = () => {
        navigate(Path.Skills + name + '/view');
    }

    return (
        <Card>
            <CardHeader title={skill?.name!!} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <InputSelectFieldCard defaultValue={skill?.type!!} onCommit={(value: string): void => {
                        onChange('type', value)
                    }} title={'Skill Type'} options={getSkillTypes()}/>
                    <InputSelectFieldCard defaultValue={skill?.characteristic!!} onCommit={(value: string): void => {
                        onChange('characteristic', value)
                    }} title={'Linked Characteristic'} options={getCharacteristicTypes()}/>
                    <EditSettingsCard names={skill?.settings!!} onSettingAddition={onSettingAddition}
                                      onSettingRemoval={onSettingRemoval} settings={settings}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
