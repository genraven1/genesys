import Stats, {StatsType} from "../../models/actor/Stats";
import {Card, CardActions, CardHeader, Divider, Grid, Typography} from "@mui/material";
import InputNumberRangeSelectField from "../input/InputNumberRangeSelect";

interface Props {
    stats: Stats,
    type: StatsType
}

export default function StatsCard(props: Props) {
    const { stats, type } = props;

    const onChange = async (value: number) => {
        stats.current = value
    }

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
                    <InputNumberRangeSelectField defaultValue={stats.max} min={1} max={20} onCommit={(value: number): void => { onChange(value) }} />
                </CardActions>
            </Card>
        </Grid>
    )
}