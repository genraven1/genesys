import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import Armor, { ArmorStats, DefaultArmor } from "../../models/equipment/Armor";
import BaseEquipmentStats from "../../models/equipment/Equipment";
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

    const updateEquipmentStats = (equipmentStats: BaseEquipmentStats) => {
        console.log(equipmentStats)
        setArmor((prev_state) => ({
            ...prev_state,
            equipment: equipmentStats,
        }));
        console.log(armor.equipment)
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
                        <CreateEquipmentStats newEquipmentStats={armor.equipment} onEquipmentStatsUpdate={updateEquipmentStats} />
                        <Divider />
                        <Grid container spacing={10}>
                            <CreateArmorStats newArmorStats={armor.armorStats} onArmorStatsUpdate={updateArmorStats} />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button color='primary' type='submit'>CREATE</Button>
                </CardActions>
            </form>
        </Card>
    )
}