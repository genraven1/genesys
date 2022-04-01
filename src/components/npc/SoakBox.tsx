import { Grid, Card, CardHeader, Divider, TextField, CardContent, Typography, ratingClasses } from "@mui/material";

export interface SoakBoxProps {
    soak: number,
}

export function SoakBox(props: SoakBoxProps): JSX.Element {
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