import Stats, {StatsType} from "../../models/actor/Stats";
import {Card, CardActions, CardHeader, Divider, Grid, Typography} from "@mui/material";
import InputNumberRangeSelectField from "../common/InputNumberRangeSelect";

interface Props {
    stats: Stats,
    type: StatsType,
    onChange: (value: number) => void
}

export default function StatsCard(props: Props) {
    const { stats, type, onChange } = props;

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={type + ' Threshold'} style={{ textAlign: 'center' }} />
                <Divider />
                <Grid container spacing={10}>
                    <Grid item xs>
                        <Typography style={{ textAlign: 'center' }} >{stats.max}</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={stats.max} min={1} max={25} onCommit={onChange} />
                </CardActions>
            </Card>
        </Grid>
    )
}