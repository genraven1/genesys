import { Grid, Card, CardHeader, Divider, Typography, CardActions } from "@mui/material";
import { Fragment, useState } from "react";
import BaseEquipmentStats, { DefaultEquipment } from "../../models/equipment/Equipment";
import InputButtonGroup from "../input/InputButtonGroup";
import InlineTextField from "../input/TextField";

interface Props {
    newEquipmentStats?: BaseEquipmentStats | null,
    onEquipmentStatsUpdate: (equipmentStats: BaseEquipmentStats) => BaseEquipmentStats,
}

export default function CreateEquipmentStats(props: Props): JSX.Element {
    const { newEquipmentStats, onEquipmentStatsUpdate } = props;
    const [equipmentStats, setEquipmentStats] = useState<BaseEquipmentStats>(newEquipmentStats ?? DefaultEquipment.create());

    const handleOnNameCommit = (value: string) => {
        setEquipmentStats((prev_state) => ({
            ...prev_state,
            name: value,
        }));
        setEquipmentStats(onEquipmentStatsUpdate(equipmentStats));
    }

    const handleOnDescriptionCommit = (value: string) => {
        setEquipmentStats((prev_state) => ({
            ...prev_state,
            description: value,
        }));
        setEquipmentStats(onEquipmentStatsUpdate(equipmentStats));
    }

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

    const handleOnPriceCommit = (value: string) => {
        setEquipmentStats((prev_state) => ({
            ...prev_state,
            price: value
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
                        <CardHeader title={'Price'} style={{ textAlign: 'center' }} />
                        <Divider />
                        <Typography style={{ textAlign: 'center' }} >{equipmentStats.price}</Typography>
                        <CardActions>
                            <InlineTextField defaultValue={equipmentStats.price} onCommit={handleOnPriceCommit} />
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