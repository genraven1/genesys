import { Grid, Card, CardHeader, Divider, Typography, CardActions } from "@mui/material";
import {RatingType} from "../../../models/actor/npc/NonPlayerCharacter";
import InputNumberRangeSelectField from "../../input/InputNumberRangeSelect";

interface Props {
    rating: number,
    type: RatingType,
}

export default function RatingCard(props: Props): JSX.Element {
    let { rating, type } = props;

    const onChange = async (value: number) => {
        rating = value
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={type} style={{ textAlign: 'center' }} />
                <Divider />
                <Typography style={{ textAlign: 'center' }} >{rating}</Typography>
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={rating} min={1} max={20} onCommit={(value: number): void => { onChange(value) }} />
                </CardActions>
            </Card>
        </Grid>
    )
}