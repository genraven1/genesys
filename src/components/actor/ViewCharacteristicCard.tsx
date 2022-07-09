import {Grid, Card, CardHeader, Divider, Typography, CardContent} from "@mui/material";
import {Characteristic, CharacteristicType} from "../../models/actor/Characteristics";

interface Props {
    characteristic: Characteristic
    type: CharacteristicType
}

export default function ViewCharacteristicCard(props: Props): JSX.Element {
    const { characteristic, type } = props;

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={characteristic.current} style={{ textAlign: 'center' }} />
                <Divider />
                <CardContent>
                    <Typography style={{ textAlign: 'center' }} >{type}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}