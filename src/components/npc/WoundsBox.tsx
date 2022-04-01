import { Grid, Card, CardHeader, Divider, TextField } from "@mui/material";
import { useState, FocusEventHandler, ChangeEventHandler } from "react";
import { Wounds, DefaultWounds } from "../../models/Actor";

export interface CreateWoundsProps {
    newWounds: Wounds,
    onWoundsUpdate: (wounds: Wounds) => void;
}

export function CreateWoundsBox(props: CreateWoundsProps): JSX.Element {
    const { newWounds, onWoundsUpdate } = props;
    const [wounds, setWounds] = useState(newWounds ?? DefaultWounds.create());

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;

        setWounds((prev_state) => ({
            ...prev_state,
            maxValue: +value,
        }));
        
        onWoundsUpdate(wounds);
    }

    const handleTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;

        setWounds((prev_state) => ({
            ...prev_state,
            maxValue: +value,
        }));

        onWoundsUpdate(wounds);
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={'Wounds'} style={{ textAlign: 'center' }} />
                <Divider />
                <TextField name={'wounds'} value={wounds.maxValue ?? 1} onBlur={handleBlur} onChange={handleTextChange} fullWidth type={'number'} InputProps={{ inputProps: { min: 1 } }} />
            </Card>
        </Grid>
    )
}