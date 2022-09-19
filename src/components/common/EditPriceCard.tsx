import {Card, CardHeader, Divider, Grid, Typography} from "@mui/material";
import InputNumberRangeSelectField from "../input/InputNumberRangeSelect";
import {PriceValues} from "../../models/Price";

interface EditPriceProps {
    value: number
    onNumberChange: (value: number) => void
}

export default function EditPriceCard(props: EditPriceProps): JSX.Element {
    const {onNumberChange, value} = props
    let ones: number, tens: number, hundreds: number, thousands: number, tenThousands: number = 0

    const handleNumberChange = (priceValue: PriceValues) => {
        let update = 0
        switch (priceValue) {
            case PriceValues.ONES:
                update = value
                break
            case PriceValues.TENS:
                update = value * 10
                break
            case PriceValues.HUNDREDS:
                update = value * 100
                break
            case PriceValues.THOUSANDS:
                update = value * 1000
                break
            case PriceValues.TEN_THOUSANDS:
                update = value * 10000
                break
            default:
                break
        }
        console.log(update)
        console.log(value)
        let temp = value
        tenThousands = temp/10000
        temp = temp % 10000
        thousands = temp/1000
        temp = temp % 1000
        hundreds = temp/100
        temp = temp % 100
        hundreds = temp/10
        ones = temp % 10
        console.log(temp)
        onNumberChange(tenThousands + thousands + hundreds + tens + ones + update)
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={'Price'} style={{ textAlign: 'center' }}/>
                <Grid container spacing={0}>
                    <Grid item xs>
                        <Typography style={{ textAlign: 'center' }}>{PriceValues.ONES}</Typography>
                        <Divider />
                        <InputNumberRangeSelectField defaultValue={value} min={0} max={11} onCommit={() => handleNumberChange(PriceValues.ONES)}/>
                    </Grid>
                    <Grid item xs>
                        <Typography style={{ textAlign: 'center' }}>{PriceValues.TENS}</Typography>
                        <Divider />
                        <InputNumberRangeSelectField defaultValue={value} min={0} max={11} onCommit={() => handleNumberChange(PriceValues.TENS)}/>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}