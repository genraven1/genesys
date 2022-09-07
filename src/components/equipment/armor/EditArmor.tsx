import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import {Armor, DefaultArmor} from '../../../models/equipment/Equipment';
import EquipmentService from '../../../services/EquipmentService';
import {Path} from '../../../services/Path';
import InputTextFieldCard from '../../input/InputTextFieldCard';
import InputNumberRangeSelectField from "../../input/InputNumberRangeSelect";

export default function EditArmor() {
    const { name } = useParams<{ name: string }>();
    const [armor, setArmor] = useState<Armor | null>(null);
    const [errors, setErrors] = useState({} as any);
    let navigate = useNavigate()

    useEffect(() => {
        if (!name) {
            return;
        }
        (async (): Promise<void> => {
            const armorData = await EquipmentService.getArmor(name);
            if (!armorData) {return}
            setArmor(armorData);
        })();
    }, [name])

    function getName(armor: Armor | null): string {
        if (!armor) {
            return 'Armor View'
        }
        return armor.name
    }

    function getArmor(armor: Armor | null): Armor {
        if (!armor) {
            return DefaultArmor.create();
        }
        return armor
    }
    
    const onChange = async (key: keyof Armor, value: string) => {
        if (value === null || (armor !== null && armor[key] === value)) {
            return;
        }
        const copyArmor = {...armor} as Armor
        switch (key) {
            case 'defense':
                copyArmor.defense = Number(value)
                break
            case 'soak':
                copyArmor.soak = Number(value)
                break
            case 'description':
                copyArmor.description = value
                break
            case 'rarity':
                copyArmor.rarity = Number(value)
                break
            case 'price':
                copyArmor.price = Number(value)
                break;
            case "restricted":
                copyArmor.restricted = Boolean(value)
                break
            case 'encumbrance':
                copyArmor.encumbrance = Number(value)
                break
            case "equipped":
                copyArmor.equipped = Boolean(value)
                break
            case 'slot':
            case 'name':
                break;
        }

        await updateArmor(copyArmor)
    }

    const updateArmor = async (copyArmor: Armor): Promise<Armor> => {
        setArmor(copyArmor)
        await EquipmentService.updateArmor(copyArmor.name, copyArmor)
        return armor!!
    }

    const onView = () => {
        navigate(Path.Armor + name + '/view');
    }

    return (
        <Card>
            <CardHeader title={getName(armor)} style={{ textAlign: 'center' }} action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                <CheckIcon color='primary' fontSize='small' />
            </IconButton>}/>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <InputTextFieldCard defaultValue={getArmor(armor).description} onCommit={(value: string): void => { onChange('description', value) }} title={'Description'} helperText={'Description'} placeholder={'Description'} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <InputNumberRangeSelectField defaultValue={getArmor(armor).rarity} min={0} max={11} onCommit={(value: number): void => { onChange('description', String(value)) }} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
