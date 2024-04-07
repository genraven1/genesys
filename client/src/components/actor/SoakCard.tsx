import { Grid, Card, CardContent } from "@mui/material";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import Actor from "../../models/actor/Actor";

interface Props {
    actor: Actor,
}

export default function SoakCard(props: Props): JSX.Element {
    const { actor } = props;

    const renderSoak = () => {
        return String(actor.brawn)
    }

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Soak'}/>
                <CardContent>
                    <GenesysDescriptionTypography text={renderSoak()}/>
                </CardContent>
            </Card>
        </Grid>
    )
}