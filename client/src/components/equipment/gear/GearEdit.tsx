import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import EquipmentService from '../../../services/EquipmentService';
import {EquipmentPath} from '../../../services/Path';
import {InputTextFieldCard} from "../../common/InputTextFieldCard";
import Skill from "../../../models/actor/Skill";
import {RangeBand, getRangeOptions} from "../../../models/common/RangeBand";
import InputSelectFieldCard from "../../common/InlineSelectFieldCard";
import {EditPriceCheckBoxCard} from "../../common/NumberCheckBox";
import {Gear} from "../../../models/equipment/Gear";
import SkillSelectCard from "../../common/skill/SkillSelectCard";
import {useFetchAllSkills} from "../../skills/SkillWorkflow";
import {NumberTextFieldCard} from "../../common/card/NumberTextField";

interface Props {
    gea: Gear
}

export default function GearEdit(props: Props) {
    const {gea} = props;
    const [gear, setGear] = useState<Gear>(gea);
    let pathname = useLocation().pathname;
    let navigate = useNavigate()

    useEffect(() => {
        setGear(gea)
    }, [gea])

    const onSkillChange = async (value: Skill) => {
        const copyGear = {...gear} as Gear
        copyGear.skill = value
        setGear(copyGear)
        await EquipmentService.updateGear(copyGear)
    }

    const onChange = async (key: keyof Gear, value: string) => {
        if (value === null || (gear !== null && gear[key] === value)) {
            return;
        }
        const copyGear = {...gear} as Gear
        switch (key) {
            case 'description':
                copyGear.description = value
                break
            case "restricted":
                copyGear.restricted = !Boolean(copyGear.restricted)
                break
            case "range":
                copyGear.range = value as RangeBand
                break
            case "price":
                copyGear.price = Number(value)
                break
            case "rarity":
                copyGear.rarity = Number(value)
                break
            case "encumbrance":
                copyGear.encumbrance = Number(value)
                break
            default:
                break
        }
        updateGear(copyGear)
    }

    const updateGear = async (copyGear: Gear) => {
        setGear(copyGear)
        await EquipmentService.updateGear(copyGear)
    }

    const onView = () => {
        navigate(EquipmentPath.Gear + gear.name + '/view');
    }

    return (
        <Card>
            <CardHeader title={gear.name} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}/>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <InputTextFieldCard defaultValue={gear.description} onCommit={(value: string): void => {
                            onChange('description', value)
                        }} title={'Description'} helperText={'Description'} placeholder={'Description'}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={10}>
                        <SkillSelectCard defaultValue={gear?.skill!!} onCommit={(value: Skill): void => {
                            onSkillChange(value)
                        }} skills={useFetchAllSkills()} title={'Required Skill'}/>
                        <InputSelectFieldCard defaultValue={gear.range} onCommit={(value: string): void => {
                            onChange('range', value)
                        }} title={'Range'} options={getRangeOptions()}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={10}>
                        <NumberTextFieldCard title={'Encumbrance'} value={gear.encumbrance}
                                             onChange={(value: number): void => {
                                                 onChange('encumbrance', String(value))
                                             }} min={1}
                                             max={10} disabled={pathname.endsWith('/view')}/>
                        <EditPriceCheckBoxCard check={gear.restricted} value={gear.price} checkTitle={'Restricted'}
                                               onBooleanChange={(value: boolean): void => {
                                                   onChange('restricted', String(value))
                                               }} onNumberChange={(value: number): void => {
                            onChange('price', String(value))
                        }}/>
                        <NumberTextFieldCard title={'Rarity'} value={gear.rarity} onChange={(value: number): void => {
                            onChange('rarity', String(value))
                        }}
                                             min={0}
                                             max={10} disabled={pathname.endsWith('/view')}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
