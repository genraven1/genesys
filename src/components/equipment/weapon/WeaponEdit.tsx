import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import {Weapon} from "../../../models/equipment/Weapon";
import EquipmentService from '../../../services/EquipmentService';
import {EquipmentPath} from '../../../services/Path';
import {InputTextFieldCard} from "../../common/InputTextFieldCard";
import SkillSelectCard from "../../common/skill/SkillSelectCard";
import Skill, {SkillType} from "../../../models/actor/Skill";
import NumberRangeSelectCard from "../../common/NumberRangeSelectCard";
import CheckButtonCard from "../../common/CheckButtonCard";
import {getRangeOptions, RangeBand} from "../../../models/common/RangeBand";
import InputSelectFieldCard from "../../common/InlineSelectFieldCard";
import {EditNumberFieldCard} from "../../common/ViewFieldCard";
import {EditPriceCheckBoxCard} from "../../common/NumberCheckBox";
import WeaponQualityCard from "./WeaponQualityCard";
import EditSettingsCard from "../../common/setting/EditSettingsCard";
import SettingService from "../../../services/SettingService";
import {useFetchCurrentSettingSkillsByType} from "../../skills/SkillWorkflow";
import {useFetchAllSettings} from "../../setting/SettingWorkflow";


interface Props {
    wea: Weapon
}

export default function WeaponEdit(props: Props) {
    const {wea} = props
    const [weapon, setWeapon] = useState<Weapon>(wea)
    let navigate = useNavigate()

    useEffect(() => {
        setWeapon(wea)
    }, [wea])

    const onSettingAddition = async (name: string) => {
        const copyWeapon = {...weapon} as Weapon
        let setting = await SettingService.getSetting(name)
        copyWeapon.settings = copyWeapon.settings.concat(setting)
        await updateWeapon(copyWeapon)
    }

    const onSettingRemoval = async (name: string) => {
        const copyWeapon = {...weapon} as Weapon
        copyWeapon.settings.forEach((set, index) => {
            if (set.name === name) {
                copyWeapon.settings.splice(index, 1)
            }
        })
        await updateWeapon(copyWeapon)
    }

    const onSkillChange = async (value: Skill) => {
        const copyWeapon = {...weapon} as Weapon
        copyWeapon.skill = value
        await updateWeapon(copyWeapon)
    }

    const onChange = async (key: keyof Weapon, value: string) => {
        if (value === null || (weapon !== null && weapon[key] === value)) {
            return
        }
        const copyWeapon = {...weapon} as Weapon
        switch (key) {
            case 'description':
                copyWeapon.description = value
                break
            case "brawn":
                copyWeapon.brawn = !Boolean(copyWeapon.brawn)
                break
            case "restricted":
                copyWeapon.restricted = !Boolean(copyWeapon.restricted)
                break
            case 'encumbrance':
                copyWeapon.encumbrance = Number(value)
                break
            case "range":
                copyWeapon.range = value as RangeBand
                break
            case 'rarity':
                copyWeapon.rarity = Number(value)
                break
            case 'price':
                copyWeapon.price = Number(value)
                break;
            case "damage":
                copyWeapon.damage = Number(value)
                break
            case "critical":
                copyWeapon.critical = Number(value)
                break
            case "hands":
                copyWeapon.hands = Number(value)
                break
            default:
                break
        }

        await updateWeapon(copyWeapon)
    }

    const updateWeapon = async (copyWeapon: Weapon) => {
        setWeapon(copyWeapon)
        await EquipmentService.updateWeapon(copyWeapon.name, copyWeapon)
    }

    const onView = () => {
        navigate(EquipmentPath.Weapon + weapon.name + '/view');
    }

    return (
        <Card>
            <CardHeader title={weapon.name} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}/>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <InputTextFieldCard defaultValue={weapon.description} onCommit={(value: string): void => {
                            onChange('description', value)
                        }} title={'Description'} helperText={'Description'} placeholder={'Description'}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={10}>
                        <SkillSelectCard defaultValue={weapon.skill} onCommit={(value: Skill): void => {
                            onSkillChange(value)
                        }} skills={useFetchCurrentSettingSkillsByType(SkillType.Combat)} title={'Required Skill'}/>
                        <NumberRangeSelectCard title={'Damage'} defaultValue={weapon.damage}
                                               onChange={(value: number): void => {
                                                   onChange('damage', String(value))
                                               }} min={0} max={20}/>
                        <CheckButtonCard title={'Brawn Powered'} value={weapon.brawn}
                                         onChange={(value: boolean): void => {
                                             onChange('brawn', String(value))
                                         }}/>
                        <NumberRangeSelectCard title={'Critical'} defaultValue={weapon.critical}
                                               onChange={(value: number): void => {
                                                   onChange('critical', String(value))
                                               }} min={1} max={7}/>
                        <InputSelectFieldCard defaultValue={weapon.range} onCommit={(value: string): void => {
                            onChange('range', value)
                        }} title={'Range'} options={getRangeOptions()}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={10}>
                        <EditNumberFieldCard value={weapon.encumbrance} title={'Encumbrance'}
                                             onChange={(value: number): void => {
                                                 onChange('encumbrance', String(value))
                                             }} min={0} max={10}/>
                        <EditPriceCheckBoxCard check={weapon.restricted} value={weapon.price}
                                               checkTitle={'Restricted'} onBooleanChange={(value: boolean): void => {
                            onChange('restricted', String(value))
                        }} onNumberChange={(value: number): void => {
                            onChange('price', String(value))
                        }}/>
                        <EditNumberFieldCard value={weapon.rarity} title={'Rarity'}
                                             onChange={(value: number): void => {
                                                 onChange('rarity', String(value))
                                             }} min={0} max={11}/>
                        <EditNumberFieldCard value={weapon.hands} title={'Hands'}
                                             onChange={(value: number): void => {
                                                 onChange('hands', String(value))
                                             }} min={1} max={3}/>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <WeaponQualityCard weapon={weapon}/>
                    </Grid>
                    <EditSettingsCard settings={weapon.settings} onSettingAddition={onSettingAddition}
                                      onSettingRemoval={onSettingRemoval} allSettings={useFetchAllSettings()}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
