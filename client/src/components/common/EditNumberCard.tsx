import {Card, CardHeader, Divider, Grid} from "@mui/material";
import InlineNumberField from "./NumberField";

interface EditPriceProps {
    title: string
    value: number
    onChange: (value: number) => void
}

export default function EditNumberCard(props: EditPriceProps): JSX.Element {
    const {onChange, value, title} = props

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={title} style={{ textAlign: 'center' }}/>
                <Divider />
                <InlineNumberField defaultValue={value} onCommit={onChange} />
            </Card>
        </Grid>
    )
}