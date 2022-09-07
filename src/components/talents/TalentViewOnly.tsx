import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import {ViewFieldCard} from "../common/ViewFieldCard";
import Talent from "../../models/Talent";

export default function TalentViewOnly(props: {talent: Talent}) {
    const {talent} = props
    return (
        <Card>
            <CardHeader title={talent.name} />
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={talent.description} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Ranked'} value={talent.ranked} />
                        <ViewFieldCard name={'Activation'} value={talent.activation} />
                        <ViewFieldCard name={'Tier'} value={talent.tier} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
