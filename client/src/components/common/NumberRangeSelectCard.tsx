import {Card, CardActions, CardHeader, Divider, Grid, Typography} from "@mui/material";
import InputNumberRangeSelectField from "./InputNumberRangeSelect";

interface Props {
    defaultValue: number
    title: string
    onChange: (value: number) => void
    min: number
    max: number
}

export default function NumberRangeSelectCard(props: Props) {
    const {defaultValue,title,onChange,min,max} = props

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={title} style={{ textAlign: 'center' }} />
                <Divider />
                <Grid container spacing={10}>
                    <Grid item xs>
                        <Typography style={{ textAlign: 'center' }} >{defaultValue}</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={defaultValue} min={min} max={max} onCommit={onChange} />
                </CardActions>
            </Card>
        </Grid>
    )
}