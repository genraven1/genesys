import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import Armor, { ArmorStats, DefaultArmor } from "../../models/equipment/Armor";
import EquipmentStats from "../../models/equipment/EquipmentStats";
import InputTextFieldCard from "../input/InputTextFieldCard";
import CreateArmorStats from "./CreateArmorStats";
import CreateEquipmentStats from "./CreateEquipmentStats";

interface Props {
    newArmor?: Armor | null
}

export default function CreateArmor(props: Props) {
    const { newArmor } = props;
    const [armor, setArmor] = useState(newArmor ?? DefaultArmor.create());
    const [errors, setErrors] = useState({} as any);
    let navigate = useNavigate();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log(armor);
        //ActorService.createMinion(armor);
        //navigate('/actors/npcs/minions/' + armor.id);
    }

    const handleOnNameCommit = (value: string) => {
        setArmor((prev_state) => ({
            ...prev_state,
            name: value,
        }));
    }

    const handleOnDescriptionCommit = (value: string) => {
        setArmor((prev_state) => ({
            ...prev_state,
            description: value,
        }));
    }

    const handleOnPriceCommit = (value: string) => {
        setArmor((prev_state) => ({
            ...prev_state,
            price: value,
        }));
    }

    const updateEquipmentStats = (equipmentStats: EquipmentStats) => {
        setArmor((prev_state) => ({
            ...prev_state,
            equipment: equipmentStats,
        }));
        return armor.equipment;
    }

    const updateArmorStats = (armorStats: ArmorStats) => {
        setArmor((prev_state) => ({
            ...prev_state,
            armorStats: armorStats,
        }));
        return armor.armorStats;
    }

    return (
        <Card>
            <CardHeader title={'Create Armor'} />
            <Divider />
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <Grid container justifyContent={'center'}>
                        <Grid container spacing={10}>
                            <InputTextFieldCard defaultValue={'Name'} onCommit={handleOnNameCommit} title={'Name'} helperText={'Name'} placeholder={'Name'} />
                            <InputTextFieldCard defaultValue={'Description'} onCommit={handleOnDescriptionCommit} title={'Description'} helperText={'Description'} placeholder={'Description'} />
                            <InputTextFieldCard defaultValue={'Price'} onCommit={handleOnPriceCommit} title={'Price'} helperText={'Price'} placeholder={'Price'} />
                        </Grid>
                        <Divider />
                        <CreateEquipmentStats newEquipmentStats={armor.equipment} onEquipmentStatsUpdate={updateEquipmentStats} />
                        <Divider />
                        <CreateArmorStats newArmorStats={armor.armorStats} onArmorStatsUpdate={updateArmorStats} />
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button color='primary' type='submit'>CREATE</Button>
                </CardActions>
            </form>
        </Card>
    )
}