import Stats, {StatsType} from "../../models/actor/Stats";
import {Card, CardContent, CardHeader, Divider, Grid, Typography} from "@mui/material";

interface Props {
    stats: Stats,
    type: StatsType
}

export default function ViewStatsCard(props: Props) {
    const { stats, type } = props;

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={type + ' Threshold'} style={{ textAlign: 'center' }} />
                <Divider />
                <CardContent>
                    <Typography style={{ textAlign: 'center' }} >{stats.max}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}