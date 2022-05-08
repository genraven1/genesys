import { Grid, Card, CardHeader, Divider, Typography, CardActions } from "@mui/material";
import { Fragment, useState } from "react";
import EquipmentStats, { DefaultEquipment } from "../../models/equipment/EquipmentStats";
import InputButtonGroup from "../input/InputButtonGroup";

interface Props {
    newEquipmentStats?: EquipmentStats | null,
    onEquipmentStatsUpdate: (equipmentStats: EquipmentStats) => EquipmentStats,
}

export default function CreateEquipmentStats(props: Props): JSX.Element {
    const { newEquipmentStats, onEquipmentStatsUpdate } = props;
    const [equipmentStats, setEquipmentStats] = useState<EquipmentStats>(newEquipmentStats ?? DefaultEquipment.create());

    const handleEncumbranceDecrease = () => {
        setEquipmentStats((prev_state) => ({
            ...prev_state,
            encumbrance: equipmentStats.encumbrance--,
        }));
        setEquipmentStats(onEquipmentStatsUpdate(equipmentStats));
    }

    const handleEncumbranceIncrease = () => {
        setEquipmentStats((prev_state) => ({
            ...prev_state,
            encumbrance: equipmentStats.encumbrance++,
        }));
        setEquipmentStats(onEquipmentStatsUpdate(equipmentStats));
    }

    const handleRarityDecrease = () => {
        setEquipmentStats((prev_state) => ({
            ...prev_state,
            rarity: equipmentStats.rarity--,
        }));
        setEquipmentStats(onEquipmentStatsUpdate(equipmentStats));
    }

    const handleRarityIncrease = () => {
        setEquipmentStats((prev_state) => ({
            ...prev_state,
            rarity: equipmentStats.rarity++,
        }));
        setEquipmentStats(onEquipmentStatsUpdate(equipmentStats));
    }

    return (
        <Fragment>
            <Grid container spacing={10}>
                <Grid item xs>
                    <Card>
                        <CardHeader title={'Encumbrance'} style={{ textAlign: 'center' }} />
                        <Divider />
                        <Typography style={{ textAlign: 'center' }} >{equipmentStats.encumbrance}</Typography>
                        <CardActions>
                            <InputButtonGroup onIncrease={handleEncumbranceIncrease} onDecrease={handleEncumbranceDecrease} />
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card>
                        <CardHeader title={'Rarity'} style={{ textAlign: 'center' }} />
                        <Divider />
                        <Typography style={{ textAlign: 'center' }} >{equipmentStats.rarity}</Typography>
                        <CardActions>
                            <InputButtonGroup onIncrease={handleRarityIncrease} onDecrease={handleRarityDecrease} />
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    )
}