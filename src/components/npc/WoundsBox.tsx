import { Grid, Card, CardHeader, Divider } from "@mui/material";
import { useState, FocusEventHandler, ChangeEventHandler } from "react";
import { Wounds, DefaultWounds } from "../../models/Actor";
import InlineNumberField from "../input/NumberField";

export interface CreateWoundsProps {
    newWounds: Wounds,
    onWoundsUpdate: (wounds: Wounds) => void;
}

export function CreateWoundsBox(props: CreateWoundsProps): JSX.Element {
    const { newWounds, onWoundsUpdate } = props;
    const [wounds, setWounds] = useState(newWounds ?? DefaultWounds.create());

    const handleOnCommit = (value: number) => {
        setWounds((prev_state) => ({
            ...prev_state,
            maxValue: value,
        }));
        onWoundsUpdate(wounds);
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={'Wounds'} style={{ textAlign: 'center' }} />
                <Divider />
                <InlineNumberField defaultValue={1} onCommit={handleOnCommit} editable={true} helperText={'Wound Threshold'} errorText={''} />
                {/* <TextField name={'wounds'} value={wounds.maxValue ?? 1} onBlur={handleBlur} onChange={handleTextChange} fullWidth type={'number'} InputProps={{ inputProps: { min: 1 } }} /> */}
            </Card>
        </Grid>
    )
}