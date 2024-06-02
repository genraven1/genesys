import { Grid, Card, CardHeader, Divider, Typography, CardActions } from "@mui/material";
import {RatingType} from "../../../models/actor/npc/NonPlayerActor";
import InputNumberRangeSelectField from "../../common/InputNumberRangeSelect";

interface Props {
    rating: number,
    type: RatingType,
    onChange: (value: number) => void
}

export default function RatingCard(props: Props): JSX.Element {
    let { rating, type, onChange } = props;

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={type} style={{ textAlign: 'center' }} />
                <Divider />
                <Typography style={{ textAlign: 'center' }} >{rating}</Typography>
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={rating} min={1} max={20} onCommit={onChange} />
                </CardActions>
            </Card>
        </Grid>
    )
}