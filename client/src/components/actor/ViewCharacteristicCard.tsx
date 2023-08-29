import {Grid, Card, CardContent} from "@mui/material";
import {CharacteristicType} from "../../models/actor/Characteristics";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";

interface Props {
    characteristic: number
    type: CharacteristicType
}

export default function ViewCharacteristicCard(props: Props): JSX.Element {
    const {characteristic, type} = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={String(characteristic)}/>
                <CardContent>
                    <GenesysDescriptionTypography text={type}/>
                </CardContent>
            </Card>
        </Grid>
    )
}