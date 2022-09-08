import {Card, CardHeader, Divider, Grid, Typography} from "@mui/material";
import InputNumberRangeSelectField from "../input/InputNumberRangeSelect";

interface EditPriceProps {
    value: number
    onNumberChange: (value: number) => void
}

export default function EditPriceCard(props: EditPriceProps): JSX.Element {
    const {onNumberChange, value} = props
    let ones: number, tens: number, hundreds: number, thousands: number, tenThousands: number = 0

    const handleNumberChange = () => {
        let price = ones + tens + hundreds + thousands + tenThousands
        onNumberChange(price)
    }

    const addNumberSet = (): JSX.Element => {
        return (
            <Grid item xs>
                <Typography style={{ textAlign: 'center' }}>{'Ones'}</Typography>
                <Divider />
                <InputNumberRangeSelectField defaultValue={value} min={0} max={11} onCommit={handleNumberChange}/>
            </Grid>
        )
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={'Price'} style={{ textAlign: 'center' }}/>
                <Grid container spacing={0}>
                    {addNumberSet(1)}
                    {addNumberSet(10)}
                </Grid>
            </Card>
        </Grid>
    )
}