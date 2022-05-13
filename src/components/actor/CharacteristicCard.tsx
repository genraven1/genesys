import { Grid, Card, CardHeader, Divider, Typography, CardActions } from "@mui/material";
import { useState } from "react";
import { Characteristic, CharacteristicKey } from "../../models/actor/Characteristics";
import InputNumberRangeSelectField from "../input/InputNumberRangeSelect";

interface Props {
    characteristic: Characteristic,
    characteristicKey: CharacteristicKey
}

export default function CharacteristicBox(props: Props): JSX.Element {
    const { characteristic, characteristicKey } = props;
    const [characteristicData, setCharacteristicData] = useState(characteristic)

    const onChange = async (key: keyof Characteristic, value: number) => {
        if (characteristicData !== null && characteristicData[key] === value) {
            return;
        }
        const copyCharacteristic = { ...characteristicData } as Characteristic;
        switch (key) {
            
        }
        setCharacteristicData(copyCharacteristic)
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={characteristic.type} style={{ textAlign: 'center' }} />
                <Divider />
                <Typography style={{ textAlign: 'center' }} >{characteristic.currentValue}</Typography>
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={characteristic.currentValue} min={1} max={6} onCommit={(value: number): void => { onChange(characteristicKey, value) }} />
                </CardActions>
            </Card>
        </Grid>
    )
}