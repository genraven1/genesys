import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import Armor, { ArmorStats, DefaultArmor } from "../../models/equipment/Armor";
import BaseEquipmentStats from "../../models/equipment/Equipment";
import InlineTextField from "../input/TextField";
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

    const updateEquipmentStats = (equipmentStats: BaseEquipmentStats) => {
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
                            <Grid item xs>
                                <Card>
                                    <CardHeader title={'Name'} style={{ textAlign: 'center' }} />
                                    <Divider />
                                    <InlineTextField defaultValue={'Name'} editable={true} onCommit={handleOnNameCommit} helperText={'Name'} placeholder={'Name'} errorText={''} />
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card>
                                    <CardHeader title={'Description'} style={{ textAlign: 'center' }} />
                                    <Divider />
                                    <InlineTextField defaultValue={'Description'} editable={true} onCommit={handleOnDescriptionCommit} helperText={'Description'} placeholder={'Description'} errorText={''} />
                                </Card>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={10}>
                            <CreateEquipmentStats newEquipmentStats={armor.equipment} onEquipmentStatsUpdate={updateEquipmentStats}  />
                        </Grid>
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