import {Card, CardHeader, Divider, Grid} from "@mui/material";
import {Defense, DefenseType} from "../../models/actor/Defense";
import DefenseCard from "./DefenseCard";

interface Props {
    melee: Defense
    ranged: Defense
}

export default function TotalDefenseCard(props: Props) {
    const { melee, ranged } = props;

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={'Defense'} style={{ textAlign: 'center' }} />
                <Divider />
                <Grid container spacing={10}>

                </Grid>
            </Card>
        </Grid>
    )
}