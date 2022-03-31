import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField } from "@mui/material";
import { ChangeEventHandler, FocusEventHandler, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import Minion, { DefaultMinion } from "../../../models/Minion";
import ActorService from "../../../services/ActorService";


interface Props {
    minion?: Minion | null,
}

export default function CreateTalent(props: Props) {
    const { minion: newMinion } = props;
    const [minion, setMinion] = useState(newMinion ?? DefaultMinion.create());
    const [errors, setErrors] = useState({} as any);
    let navigate = useNavigate();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log(minion);
        //ActorService.createMinion(minion);
        //navigate('/actors/npcs/minions/' + minion.id);
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;

        setMinion((prev_state) => ({
            ...prev_state,
            [name]: value,
        }));
    }

    const handleTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;

        setMinion((prev_state) => ({
            ...prev_state,
            [name]: value,
        }));
    }

    return (
        <Card>
            <CardHeader title={'Create Minion'} />
            <Divider />
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <Grid container justifyContent={'center'}>
                        <TextField name='name' label='Name' value={minion.name ?? ''} onBlur={handleBlur} onChange={handleTextChange} fullWidth />
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button color='primary' type='submit'>CREATE</Button>
                </CardActions>
            </form>
        </Card>
    )
}