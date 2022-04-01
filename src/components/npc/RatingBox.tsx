import { Grid, Card, CardHeader, Divider, TextField } from "@mui/material";
import { useState, FocusEventHandler, ChangeEventHandler } from "react";
import { DefaultRating, Rating } from "../../models/NonPlayerCharacter";

export interface RatingProps {
    updatedRating: Rating,
    onRatingUpdate: (rating: Rating) => void,
}

export function RatingBox(props: RatingProps): JSX.Element {
    const { updatedRating, onRatingUpdate } = props;
    const [rating, setRating] = useState(updatedRating ?? DefaultRating.create(updatedRating));

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;

        setRating((prev_state) => ({
            ...prev_state,
            value: +value,
        }));

        onRatingUpdate(rating);
    }

    const handleTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;

        setRating((prev_state) => ({
            ...prev_state,
            value: +value,
        }));

        onRatingUpdate(rating);
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={rating.type} style={{ textAlign: 'center' }} />
                <Divider />
                <TextField name={rating.type} value={rating.value ?? 1} onBlur={handleBlur} onChange={handleTextChange} fullWidth type={'number'} InputProps={{ inputProps: { min: 1 } }} />
            </Card>
        </Grid>
    )
}