import {Card, CardContent, CardHeader, Checkbox, Divider, Grid, IconButton} from '@mui/material';
import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import {Weapon} from '../../../models/equipment/Equipment';
import EquipmentService from '../../../services/EquipmentService';
import {EquipmentPath} from '../../../services/Path';
import {InputTextFieldCard} from "../../common/InputTextFieldCard";
import SkillSelectCard from "../../common/SkillSelectCard";
import Skill, {SkillType} from "../../../models/actor/Skill";
import NumberRangeSelectCard from "../../common/NumberRangeSelectCard";

export default function WeaponEdit(props: {wea: Weapon}) {
    const {wea} = props
    const {name} = useParams<{ name: string }>()
    const [weapon, setWeapon] = useState<Weapon>(wea)
    const [errors, setErrors] = useState({} as any)
    let navigate = useNavigate()

    const onSkillChange = async (value: Skill) => {
        const copyWeapon = {...weapon} as Weapon
        copyWeapon.skill = value
        await updateWeapon(copyWeapon)
    }

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
            case "skill":
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
            case "skill":
            case 'slot':
            case 'name':
                break
        }

        await updateWeapon(copyWeapon)
    }

    const updateWeapon = async (copyWeapon: Weapon): Promise<Weapon> => {
        setWeapon(copyWeapon)
        await EquipmentService.updateWeapon(name!!, copyWeapon)
        return weapon!!
    }

    const handleBrawnClick = async (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const copyWeapon = {...weapon} as Weapon
        console.log(value)
        if (value === 'on') {
            copyWeapon.brawn = true
        } else {
            copyWeapon.brawn = false
        }
        await updateWeapon(copyWeapon)
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
                    <SkillSelectCard defaultValue={weapon?.skill} onCommit={(value: Skill): void => {onSkillChange(value)}} type={SkillType.Combat} />
                    <NumberRangeSelectCard title={'Damage'} defaultValue={weapon?.damage!!} onChange={(value: number): void => {onNumberChange('damage', value)}} min={0} max={20} />
                    <Grid item xs>
                        <CardHeader title={'Brawn Powered'} style={{ textAlign: 'center' }} />
                        <Divider />
                        <Checkbox onChange={handleBrawnClick} checked={weapon?.brawn!!}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
