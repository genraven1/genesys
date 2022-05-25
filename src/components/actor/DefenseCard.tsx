import {Card, CardActions, CardHeader, Divider, Grid, Typography} from "@mui/material";
import InputNumberRangeSelectField from "../input/InputNumberRangeSelect";
import {Defense, DefenseType} from "../../models/actor/Defense";

interface Props {
    defense: Defense
    type: DefenseType
}

export default function DefenseCard(props: Props) {
    const { defense, type } = props;

    const onChange = async (value: number) => {
        defense.current = value
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={type} style={{ textAlign: 'center' }} />
                <Divider />
                <Grid container spacing={10}>
                    <Grid item xs>
                        <Typography style={{ textAlign: 'center' }} >{defense.current}</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={defense.current} min={1} max={5} onCommit={(value: number): void => { onChange(value) }} />
                </CardActions>
            </Card>
        </Grid>
    )
}