import { Grid, Card, CardHeader, Divider, CardContent, Typography } from "@mui/material";

interface SoakBoxProps {
    soak: number,
}

export default function SoakBox(props: SoakBoxProps): JSX.Element {
    const { soak } = props;
    return (
        <Grid item xs>
            <Card>
                <CardHeader title={'Soak'} style={{ textAlign: 'center' }} />
                <Divider />
                <CardContent>
                    <Typography>{soak}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}