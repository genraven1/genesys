import {Grid, Card, Divider, CardContent} from "@mui/material";
import {Characteristic, CharacteristicType} from "../../models/actor/Characteristics";
import {CenteredGenesysTypography} from "../common/typography/GenesysTypography";
import CenteredCardHeader from "../common/card/CenteredCardHeader";

interface Props {
    characteristic: Characteristic
    type: CharacteristicType
}

export default function ViewCharacteristicCard(props: Props): JSX.Element {
    const { characteristic, type } = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={String(characteristic?.current!!)}/>
                <Divider />
                <CardContent>
                    <CenteredGenesysTypography value={type}/>
                </CardContent>
            </Card>
        </Grid>
    )
}