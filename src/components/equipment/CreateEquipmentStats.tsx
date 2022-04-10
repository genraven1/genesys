import { Grid, Card, CardHeader, Divider, Typography, CardActions } from "@mui/material";
import { Fragment, useState } from "react";
import BaseEquipmentStats, { DefaultEquipment } from "../../models/equipment/Equipment";
import InputButtonGroup from "../input/InputButtonGroup";
import PriceButtonGroup from "../input/PriceButtonGroup";

interface Props {
    newEquipmentStats?: BaseEquipmentStats | null,
    onEquipmentStatsUpdate: (equipmentStats: BaseEquipmentStats) => BaseEquipmentStats,
}

export default function CreateEquipmentStats(props: Props): JSX.Element {
    const { newEquipmentStats, onEquipmentStatsUpdate } = props;
    const [equipmentStats, setEquipmentStats] = useState<BaseEquipmentStats>(newEquipmentStats ?? DefaultEquipment.create());

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

    const handlePriceIncrease = (value: number) => {
        let tempPrice = Number(equipmentStats.price) + Number(value) as Number;
        console.log(tempPrice);
        setEquipmentStats((prev_state) => ({
            ...prev_state,
            price: Number(tempPrice),
        }));
        console.log(equipmentStats.price)
        setEquipmentStats(onEquipmentStatsUpdate(equipmentStats));
    }

    const handlePriceDecreaseByFive = () => {
        setEquipmentStats((prev_state) => ({
            ...prev_state,
            price: Number(equipmentStats.price)-Number(5),
        }));
        console.log(equipmentStats.price)
        setEquipmentStats(onEquipmentStatsUpdate(equipmentStats));
    }

    return (
        <Fragment>
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
                        <PriceButtonGroup onIncrease={handlePriceIncrease} onDecreaseByOne={function (): void {
                            throw new Error("Function not implemented.");
                        } } onDecreaseByFive={handlePriceDecreaseByFive} onDecreaseByTen={function (): void {
                            throw new Error("Function not implemented.");
                        } } onDecreaseByHundred={function (): void {
                            throw new Error("Function not implemented.");
                        } } />
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
        </Fragment>
    )
}