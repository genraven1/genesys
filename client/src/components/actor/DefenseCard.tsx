import {Card, CardActions, CardHeader, Divider, Grid, Typography} from "@mui/material";
import InputNumberRangeSelectField from "../common/InputNumberRangeSelect";
import {Defense, DefenseType} from "../../models/actor/Defense";

interface Props {
    defense: Defense
    type: DefenseType
    onChange: (value: number) => void
}

export default function DefenseCard(props: Props) {
    const { defense, type, onChange } = props;

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={type} style={{ textAlign: 'center' }} />
                <Divider />
                <Grid container spacing={10}>
                    <Grid item xs>
                        <Typography style={{ textAlign: 'center' }} >{defense?.current!!}</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={defense?.current!!} min={0} max={5} onCommit={onChange} />
                </CardActions>
            </Card>
        </Grid>
    )
}