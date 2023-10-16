import { Grid, Card, CardContent } from "@mui/material";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";

interface Props {
    soak: number,
}

export default function SoakCard(props: Props): JSX.Element {
    const { soak } = props;
    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Soak'}/>
                <CardContent>
                    <GenesysDescriptionTypography text={String(soak)}/>
                </CardContent>
            </Card>
        </Grid>
    )
}