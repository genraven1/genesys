import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from 'react';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import {Gear} from '../../../models/equipment/Equipment';
import EquipmentService from '../../../services/EquipmentService';
import {EquipmentPath} from '../../../services/Path';
import {InputTextFieldCard} from "../../common/InputTextFieldCard";
import {AllSkillsSelectCard} from "../../common/SkillSelectCard";
import Skill from "../../../models/actor/Skill";
import {Option} from "../../common/InputSelectField";
import {RangeBand} from "../../../models/common/RangeBand";
import InputSelectFieldCard from "../../common/InlineSelectFieldCard";
import {EditNumberFieldCard} from "../../common/ViewFieldCard";
import {EditPriceCheckBoxCard} from "../../common/NumberCheckBox";

const getRangeOptions = (): Option[] => {
    return Object.values(RangeBand).map((value) => ({value}))
}

export default function GearEdit(props: {gea: Gear}) {
    const {gea} = props
    const {name} = useParams<{ name: string }>()
    const [gear, setGear] = useState<Gear>(gea)
    const [errors, setErrors] = useState({} as any)
    let navigate = useNavigate()

    const onSkillChange = async (value: Skill) => {
        const copyGear = {...gear} as Gear
        copyGear.skill = value
        await updateGear(copyGear)
    }

    const onNumberChange = async (key: keyof Gear, value: number) => {
        const copyGear = {...gear} as Gear
        switch (key) {
            case 'rarity':
                copyGear.rarity = value
                break
            case 'price':
                copyGear.price = value
                break;
            case 'encumbrance':
                copyGear.encumbrance = value
                break
            default:
                break
        }

        await updateGear(copyGear)
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
            default:
                break
        }

        await updateGear(copyGear)
    }

    const updateGear = async (copyGear: Gear): Promise<Gear> => {
        setGear(copyGear)
        await EquipmentService.updateGear(name!!, copyGear)
        return gear!!
    }

    const onView = () => {
        navigate(EquipmentPath.Gear + name + '/view');
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
                        <InputTextFieldCard defaultValue={gear?.description!!} onCommit={(value: string): void => { onChange('description', value) }} title={'Description'} helperText={'Description'} placeholder={'Description'} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <AllSkillsSelectCard defaultValue={gear?.skill!!} onCommit={(value: Skill): void => {onSkillChange(value)}} />
                        <InputSelectFieldCard defaultValue={gear?.range!!} onCommit={(value: string): void => { onChange('range', value) }} title={'Range'} options={getRangeOptions()} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <EditNumberFieldCard value={gear?.encumbrance!!} title={'Encumbrance'} onChange={(value: number): void => { onNumberChange('encumbrance', value)}} min={0} max={10} />
                        <EditPriceCheckBoxCard check={gear?.restricted!!} value={gear?.price!!} checkTitle={'Restricted'} onBooleanChange={(value: boolean): void => { onChange('restricted', String(value))}} onNumberChange={(value: number): void => { onNumberChange('price', value)}} />
                        <EditNumberFieldCard value={gear?.rarity!!} title={'Rarity'} onChange={(value: number): void => { onNumberChange('rarity', value)}} min={0} max={11} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
