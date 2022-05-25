import Stats, {StatsType} from "../../models/actor/Stats";
import {Card, CardHeader, Divider, Grid, Typography} from "@mui/material";

interface Props {
    stats: Stats,
    type: StatsType
}

export default function DisplayStatsCard(props: Props) {
    const { stats, type } = props;

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={type} style={{ textAlign: 'center' }} />
                <Divider />
                <Grid container spacing={10}>
                    <Grid item xs>
                        <Typography style={{ textAlign: 'center' }} >{stats.max}</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography style={{ textAlign: 'center' }} >{stats.current}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={10}>
                    <Grid item xs>
                        <Typography style={{ textAlign: 'center' }} >{'Threshold'}</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography style={{ textAlign: 'center' }} >{'Current'}</Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}