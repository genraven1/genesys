import {Card, Grid, TextField} from "@mui/material";
import CenteredCardHeader from "./CenteredCardHeader";
import * as React from "react";
import {useLocation} from "react-router-dom";

interface Props {
    price: number
    restricted: boolean
    onChange: (value: number) => void
    min: number
    max: number
    disabled: boolean
}

export default function PriceTextFieldCard(props: Props) {
    const {price, restricted, onChange, min, max, disabled} = props;
    let pathname = useLocation().pathname;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={"Price"}/>
                <TextField
                    type="number"
                    value={restricted && pathname.endsWith('/view') ? `${price}(R)` : price}
                    label={"Price"}
                    fullWidth
                    onChange={(e) => onChange(Number(e.target.value))}
                    inputProps={{min: min, max: max}}
                    disabled={disabled}
                />
            </Card>
        </Grid>
    );
}