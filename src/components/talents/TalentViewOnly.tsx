import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import ViewFieldCard from "../common/ViewFieldCard";
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
                        <ViewFieldCard name={'Description'} text={talent.description} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Ranked'} text={talent.ranked} />
                        <ViewFieldCard name={'Activation'} text={talent.activation} />
                        <ViewFieldCard name={'Tier'} text={talent.tier} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
