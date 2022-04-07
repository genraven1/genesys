import { Grid, Card, CardHeader, Divider, CardActions, Typography } from "@mui/material";
import { useState } from "react";
import { Rating } from "../../models/actor/NonPlayerCharacter";
import InputButtonGroup from "../input/InputButtonGroup";

interface RatingProps {
    updatedRating: Rating,
    onRatingUpdate: (rating: Rating) => Rating,
}

export default function RatingBox(props: RatingProps): JSX.Element {
    const { updatedRating, onRatingUpdate } = props;
    const [rating, setRating] = useState(updatedRating);

    const handleOnDecrease = () => {
        setRating((prev_state) => ({
            ...prev_state,
            value: rating.value--,
        }));
        setRating(onRatingUpdate(rating));
    }

    const handleOnIncrease = () => {
        setRating((prev_state) => ({
            ...prev_state,
            value: rating.value++,
        }));
        setRating(onRatingUpdate(rating));
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={rating.type} style={{ textAlign: 'center' }} />
                <Divider />
                <Typography style={{ textAlign: 'center' }} >{rating.value}</Typography>
                <CardActions>
                    <InputButtonGroup onIncrease={handleOnIncrease} onDecrease={handleOnDecrease} />
                </CardActions>
            </Card>
        </Grid>
    )
}