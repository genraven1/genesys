import {Button, Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import {Armor, DefaultArmor} from "../../../models/equipment/Equipment";
import EquipmentService from "../../../services/EquipmentService";
import {Path} from "../../../services/Path";
import SoakCard from "../../actor/SoakCard";

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

    // const onStatChange = (copyNemesis: Nemesis, value: number, type: StatsType) => {
    //     switch (type) {
    //         case StatsType.Wounds:
    //             copyNemesis.wounds.max = value
    //             break;
    //         case StatsType.Strain:
    //             copyNemesis.strain.max = value
    //             break;
    //     }
    // }
    //
    // const onDefenseChange = (copyNemesis: Nemesis, value: number, type: DefenseType) => {
    //     switch (type) {
    //         case DefenseType.Melee:
    //             copyNemesis.melee.current = value
    //             break;
    //         case DefenseType.Ranged:
    //             copyNemesis.ranged.current = value
    //             break;
    //     }
    // }

    const onEquipmentSlotChange = (copyNemesis: Nemesis, value: number, type: RatingType) => {
        switch (type) {
            case RatingType.Combat:
                copyNemesis.combat = value
                break
            case RatingType.Social:
                copyNemesis.social = value
                break
            case RatingType.General:
                copyNemesis.general = value
                break
        }
    }
    
    const onChange = async (key: keyof Armor, value: number) => {
        if (value === null || (armor !== null && armor[key] === value)) {
            return;
        }
        const copyArmor = {...armor} as Armor
        switch (key) {
            case "defense":
                copyArmor.defense = value
                break
            case "encumbrance":
                copyArmor.encumbrance = value
                break
            case "price":
                copyArmor.price = value
                break
            case "rarity":
                copyArmor.rarity = value
                break
            case "soak":
                copyArmor.soak = value
                break
            case "slot":
                break
            case "description":
                break
            case "name":
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

                </Grid>
            </CardContent>
        </Card>
    )
}
