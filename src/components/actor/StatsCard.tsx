import Stats from "../../models/actor/Stats";
import {Card, CardActions, CardHeader, Divider, Grid, Typography} from "@mui/material";
import InputNumberRangeSelectField from "../input/InputNumberRangeSelect";

interface Props {
    stats: Stats
}

export default function StatsCard(props: Props) {
    const { stats } = props;

    const onChange = async (value: number) => {
        stats.current = value
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={stats.type} style={{ textAlign: 'center' }} />
                <Divider />
                <Grid container spacing={10}>
                    <Grid item xs><Typography style={{ textAlign: 'center' }} >{stats.current}</Typography></Grid>
                    <Grid item xs><Typography style={{ textAlign: 'center' }} >{stats.max}</Typography></Grid>
                </Grid>
                <Divider />
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={stats.max} min={1} max={6} onCommit={(value: number): void => { onChange(value) }} />
                </CardActions>
            </Card>
        </Grid>
    )
}