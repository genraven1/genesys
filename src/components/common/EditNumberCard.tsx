import {Card, CardContent, Divider, Grid} from "@mui/material";
import InlineNumberField from "./NumberField";
import CenteredCardHeader from "./card/CenteredCardHeader";

interface Props {
    title: string
    value: number
    onChange: (value: number) => void
}

export default function EditNumberCard(props: Props): JSX.Element {
    const {onChange, value, title} = props

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={title}/>
                <Divider/>
                <CardContent>
                    <InlineNumberField defaultValue={value} onCommit={onChange}/>
                </CardContent>
            </Card>
        </Grid>
    )
}