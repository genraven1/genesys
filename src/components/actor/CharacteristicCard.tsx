import { Grid, Card, CardHeader, Divider, Typography, CardActions } from "@mui/material";
import { Characteristic } from "../../models/actor/Characteristics";
import InputSelectField from "../input/InputSelectField";

interface Props {
    characteristic: Characteristic
}

export default function CharacteristicBox(props: Props): JSX.Element {
    const { characteristic } = props;

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={characteristic.type} style={{ textAlign: 'center' }} />
                <Divider />
                <Typography style={{ textAlign: 'center' }} >{value}</Typography>
                <CardActions>
                    <InputSelectField defaultValue={talent?.activation || ''} options={ACTIVATION_OPTIONS} onCommit={(value: string): void => { onChange(TalentKey.Activation, value) }} />
                </CardActions>
            </Card>
        </Grid>
    )
}