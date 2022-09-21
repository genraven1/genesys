import {Card, CardHeader, Divider, Grid} from "@mui/material";
import InlineNumberField from "./NumberField";

interface EditPriceProps {
    value: number
    onChange: (value: number) => void
}

export default function EditPriceCard(props: EditPriceProps): JSX.Element {
    const {onChange, value} = props

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={'Price'} style={{ textAlign: 'center' }}/>
                <Divider />
                <InlineNumberField defaultValue={value} onCommit={onChange} />
            </Card>
        </Grid>
    )
}