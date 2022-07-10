import {Card, CardContent, CardHeader, Divider, Grid, Typography} from "@mui/material";
import {Defense, DefenseType} from "../../models/actor/Defense";

interface Props {
    defense: Defense
    type: DefenseType
}

export default function ViewDefenseCard(props: Props) {
    const { defense, type } = props;

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={type} style={{ textAlign: 'center' }} />
                <Divider />
                <CardContent>
                    <Typography style={{ textAlign: 'center' }} >{defense.current}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}