import {Card, CardHeader, Divider, Grid} from "@mui/material";
import GenesysDescriptionTypography from "./GenesysDescriptionTypography";

interface Props {
    name: string
    text: string
}

export default function ViewFieldCard(props: Props): JSX.Element {
    const {name, text} = props
    return (
        <Grid item xs>
            <Card>
                <CardHeader title={name} style={{ textAlign: 'center' }} />
                <Divider />
                <GenesysDescriptionTypography text={text}/>
            </Card>
        </Grid>
    )
}