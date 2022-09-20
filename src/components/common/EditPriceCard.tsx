import {Card, CardHeader, Divider, Grid, Typography} from "@mui/material";
import InputNumberRangeSelectField from "../input/InputNumberRangeSelect";
import {PriceValues} from "../../models/Price";
import {useState} from "react";

interface EditPriceProps {
    value: number
    onChange: (value: number) => void
}

export default function EditPriceCard(props: EditPriceProps): JSX.Element {
    const {onChange, value} = props
    const [price, setPrice] = useState(value);
    let ones: number, tens: number, hundreds: number, thousands: number, tenThousands: number = 0

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={'Price'} style={{ textAlign: 'center' }}/>
                <Grid container spacing={0}>
                    {/*<Grid item xs>*/}
                    {/*    <Typography style={{ textAlign: 'center' }}>{PriceValues.ONES}</Typography>*/}
                    {/*    <Divider />*/}
                    {/*    <InputNumberRangeSelectField defaultValue={value} min={0} max={11} onCommit={handleChange}/>*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs>*/}
                    {/*    <Typography style={{ textAlign: 'center' }}>{PriceValues.TENS}</Typography>*/}
                    {/*    <Divider />*/}
                    {/*    <InputNumberRangeSelectField defaultValue={value} min={0} max={11} onCommit={handleChange(PriceValues.TENS)}/>*/}
                    {/*</Grid>*/}
                </Grid>
            </Card>
        </Grid>
    )
}