import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import {Armor, DefaultArmor} from '../../../models/equipment/Equipment';
import EquipmentService from '../../../services/EquipmentService';
import {Path} from '../../../services/Path';
import {EditNumberFieldCard, EditStringFieldCard} from "../../common/ViewFieldCard";
import {EditNumberCheckBoxCard, EditPriceCheckBoxCard} from "../../common/NumberCheckBox";

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
                copyArmor.restricted = !Boolean(copyArmor.restricted)
                break
            case 'encumbrance':
                copyArmor.encumbrance = Number(value)
                break
            case "equipped":
                copyArmor.equipped = !Boolean(copyArmor.equipped)
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
                        <EditStringFieldCard defaultValue={getArmor(armor).description} onCommit={(value: string): void => { onChange('description', value) }} title={'Description'} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <EditNumberFieldCard value={getArmor(armor).soak} title={'Soak'} onChange={(value: number): void => { onChange('soak', String(value))}} min={0} max={6} />
                        <EditNumberFieldCard value={getArmor(armor).defense} title={'Defense'} onChange={(value: number): void => { onChange('defense', String(value))}} min={0} max={5} />
                        <EditNumberCheckBoxCard title={'Encumbrance'} check={getArmor(armor).equipped} value={getArmor(armor).encumbrance} checkTitle={'Equipped'} onBooleanChange={(value: boolean): void => { onChange('equipped', String(value))}}  onNumberChange={(value: number): void => { onChange('encumbrance', String(value))}}/>
                        <EditPriceCheckBoxCard check={getArmor(armor).restricted} value={getArmor(armor).price} checkTitle={'Restricted'} onBooleanChange={(value: boolean): void => { onChange('restricted', String(value))}} onNumberChange={(value: number): void => { onChange('price', String(value))}} />
                        <EditNumberFieldCard value={getArmor(armor).rarity} title={'Rarity'} onChange={(value: number): void => { onChange('rarity', String(value))}} min={0} max={11} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
