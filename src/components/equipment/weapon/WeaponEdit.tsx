import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from 'react';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import {Weapon} from '../../../models/equipment/Equipment';
import EquipmentService from '../../../services/EquipmentService';
import {EquipmentPath} from '../../../services/Path';
import {InputTextFieldCard} from "../../common/InputTextFieldCard";
import InputSelectFieldCard from "../../common/InlineSelectFieldCard";
import {Option} from "../../common/InputSelectField";
import {Ranked} from "../../../models/Talent";
import Skill, {SkillType} from "../../../models/actor/Skill";
import {getActiveSkills} from "../../../models/common/SkillHelper";

const getRequiredSkills = (): Option[] => {
    let activeSkills = getActiveSkills(SkillType.Combat) as Skill[]
    let options = []
    for (const skill in activeSkills) {
        let name = skill
        options.push({skill.name})
    }
    return options
}

export default function WeaponEdit(props: {wea: Weapon}) {
    const {wea} = props
    const {name} = useParams<{ name: string }>()
    const [weapon, setWeapon] = useState<Weapon>(wea)
    const [errors, setErrors] = useState({} as any)
    let navigate = useNavigate()

    const onNumberChange = async (key: keyof Weapon, value: number) => {
        const copyWeapon = {...weapon} as Weapon
        switch (key) {
            case 'rarity':
                copyWeapon.rarity = value
                break
            case 'price':
                copyWeapon.price = value
                break;
            case 'encumbrance':
                copyWeapon.encumbrance = value
                break
            case 'slot':
            case 'name':
            case 'description':
            case "equipped":
            case "restricted":
                break
        }

        await updateWeapon(copyWeapon)
    }

    const onChange = async (key: keyof Weapon, value: string) => {
        if (value === null || (weapon !== null && weapon[key] === value)) {
            return;
        }
        const copyWeapon = {...weapon} as Weapon
        switch (key) {
            case 'description':
                copyWeapon.description = value
                break
            case 'rarity':
                copyWeapon.rarity = Number(value)
                break
            case 'price':
                copyWeapon.price = Number(value)
                break;
            case "restricted":
                copyWeapon.restricted = !Boolean(copyWeapon.restricted)
                break
            case 'encumbrance':
                copyWeapon.encumbrance = Number(value)
                break
            case "equipped":
            case 'slot':
            case 'name':
                break
        }

        await updateWeapon(copyWeapon)
    }

    const updateWeapon = async (copyWeapon: Weapon): Promise<Weapon> => {
        setWeapon(copyWeapon)
        await EquipmentService.updateWeapon(copyWeapon.name, copyWeapon)
        return weapon!!
    }

    const onView = () => {
        navigate(EquipmentPath.Weapon + name + '/view');
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
                        <InputTextFieldCard defaultValue={weapon?.description!!} onCommit={(value: string): void => { onChange('description', value) }} title={'Description'} helperText={'Description'} placeholder={'Description'} />
                    </Grid>
                    <Divider />
                    <InputSelectFieldCard defaultValue={weapon?.skill!!.name} onCommit={(value: string): void => { onChange('skill', value)}} title={'Required Skill'} options={} />
                </Grid>
            </CardContent>
        </Card>
    )
}
