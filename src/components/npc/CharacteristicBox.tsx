import { Grid, Card, CardHeader, Divider, CardActions, Typography } from "@mui/material";
import { useState } from "react";
import { Characteristic } from "../../models/Characteristics";
import InputButtonGroup from "../input/InputButtonGroup";

interface CharacteristcsBoxProps {
    newCharacteristic: Characteristic,
    onCharacteristicUpdate: (characteristic: Characteristic) => Characteristic;
}

export default function CharacteristicBox(props: CharacteristcsBoxProps): JSX.Element {
    const { newCharacteristic, onCharacteristicUpdate } = props;
    const [characteristic, setCharacteristic] = useState(newCharacteristic);

    const handleOnDecrease = () => {
        setCharacteristic((prev_state) => ({
            ...prev_state,
            currentValue: characteristic.currentValue--,
        }));
        setCharacteristic(onCharacteristicUpdate(characteristic));
    }

    const handleOnIncrease = () => {
        setCharacteristic((prev_state) => ({
            ...prev_state,
            currentValue: characteristic.currentValue++,
        }));
        setCharacteristic(onCharacteristicUpdate(characteristic));
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={characteristic.type} style={{ textAlign: 'center' }} />
                <Divider />
                <Typography style={{ textAlign: 'center' }} >{characteristic.currentValue}</Typography>
                <CardActions>
                    <InputButtonGroup onIncrease={handleOnIncrease} onDecrease={handleOnDecrease} />
                </CardActions>
            </Card>
        </Grid>
    )
}