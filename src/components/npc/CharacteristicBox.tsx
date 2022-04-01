import { Grid, Card, CardHeader, Divider, TextField } from "@mui/material";
import { useState, FocusEventHandler, ChangeEventHandler } from "react";
import { Characteristic, CharacteristicType, DefaultCharacteristic } from "../../models/Characteristics";

export interface CharacteristcsBoxProps {
    newCharacteristic: Characteristic,
    type: CharacteristicType,
    onCharacteristicUpdate: (characteristic: Characteristic) => void;
}

export function CharacteristicBox(props: CharacteristcsBoxProps): JSX.Element {
    const { newCharacteristic, type, onCharacteristicUpdate } = props;
    const [characteristic, setCharacteristic] = useState(newCharacteristic ?? DefaultCharacteristic.create(type));

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;

        setCharacteristic((prev_state) => ({
            ...prev_state,
            currentValue: +value,
        }));
        
        onCharacteristicUpdate(characteristic);
    }

    const handleTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;

        setCharacteristic((prev_state) => ({
            ...prev_state,
            currentValue: +value,
        }));

        onCharacteristicUpdate(characteristic);
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={type} style={{ textAlign: 'center' }} />
                <Divider />
                <TextField name={type} value={characteristic.currentValue ?? 1} onBlur={handleBlur} onChange={handleTextChange} fullWidth type={'number'} InputProps={{ inputProps: { min: 1, max: 5 } }} style={{ textAlign: 'center' }}/>
            </Card>
        </Grid>
    )
}