import {Card, CardContent, CardHeader, Checkbox, Divider, Grid} from '@mui/material';
import {ChangeEvent, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import SkillService from '../../services/SkillService';
import Skill, {DefaultSkill, SkillKey, SkillType} from '../../models/actor/Skill';
import InputSelectField from '../common/InputSelectField';
import {CharacteristicType} from '../../models/actor/Characteristics';

const SKILL_TYPE_OPTIONS = skillTypeOptions()

function skillTypeOptions() {
    const array = [];

    for (const [key, value] of Object.entries(SkillType)) {
        if (!Number.isNaN(Number(key))) {
            continue;
        }
        array.push({ value: key, label: value });
    }
    return array;
}

const CHARACTERISTIC_OPTIONS = characteristicOptions()

function characteristicOptions() {
    const array = [];

    for (const [key, value] of Object.entries(CharacteristicType)) {
        if (!Number.isNaN(Number(key))) {
            continue;
        }
        array.push({ value: key, label: value });
    }
    return array;
}

export default function SkillView() {
    const { name } = useParams<{ name: string }>();
    const [skill, setSkill] = useState<Skill | null>(null);
    const [errors, setErrors] = useState({} as any);

    useEffect(() => {
        if (!name) {
            return;
        }
        (async (): Promise<void> => {
            const skillData = await SkillService.getSkill(name);
            setSkill(skillData);
        })();
    }, [name])

    function getName(skill: Skill | null): string {
        if (!skill) {
            return 'Skill Character View'
        }
        return skill.name
    }

    function getSkill(skill: Skill | null): Skill {
        if (!skill) {
            return DefaultSkill.create();
        }
        return skill
    }

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

    return (
        <Card>
            <CardHeader title={getName(skill)} />
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid item xs>
                        <Card>
                            <CardHeader title={'Skill Type'} style={{ textAlign: 'center' }} />
                            <Divider />
                            <InputSelectField defaultValue={getSkill(skill).type} options={SKILL_TYPE_OPTIONS} onCommit={(value: string): void => { onChange(SkillKey.Type, value) }} />
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <Card>
                            <CardHeader title={'Linked Characteristic'} style={{ textAlign: 'center' }} />
                            <Divider />
                            <InputSelectField defaultValue={getSkill(skill).characteristic} options={CHARACTERISTIC_OPTIONS} onCommit={(value: string): void => { onChange(SkillKey.Characteristic, value) }} />
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <CardHeader title={'Active'} style={{ textAlign: 'center' }} />
                        <Divider />
                        <Checkbox onChange={handleActiveClick} checked={getSkill(skill).active}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
