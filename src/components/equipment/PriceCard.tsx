import {Card, CardActions, CardHeader, Divider, Grid, Typography} from "@mui/material";
import InputNumberRangeSelectField from "../input/InputNumberRangeSelect";
import {Price} from "../../models/equipment/Equipment";

interface Props {
    price: Price
    onChange: (value: number) => void
}

export default function StatsCard(props: Props) {
    const { price, onChange } = props;

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={'Price'} style={{ textAlign: 'center' }} />
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