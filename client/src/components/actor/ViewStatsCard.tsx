import {StatsType} from "../../models/actor/Stats";
import {Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";

interface Props {
    stat: number,
    type: StatsType
}

export default function ViewStatsCard(props: Props) {
    const { stat, type } = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={type + ' Threshold'}/>
                <CardContent>
                    <GenesysDescriptionTypography text={String(stat)}/>
                </CardContent>
            </Card>
        </Grid>
    )
}