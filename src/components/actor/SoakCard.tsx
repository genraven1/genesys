import { Grid, Card, CardHeader, Divider, CardContent, Typography } from "@mui/material";

interface Props {
    soak: number,
}

export default function SoakCard(props: Props): JSX.Element {
    const { soak } = props;
    return (
        <Grid item xs>
            <Card>
                <CardHeader title={'Soak'} style={{ textAlign: 'center' }} />
                <Divider />
                <CardContent>
                    <Typography style={{ textAlign: 'center' }}>{soak}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}