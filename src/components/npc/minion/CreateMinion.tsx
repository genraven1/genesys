import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField } from "@mui/material";
import { ChangeEventHandler, FocusEventHandler, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Characteristics } from "../../../models/Characteristics";
import Minion, { DefaultMinion } from "../../../models/Minion";

interface CharacteristcsBoxProps {
    characteristic: Characteristics
}

function CharacteristicBox(props: CharacteristcsBoxProps): JSX.Element {
    const [characteristic, setCharacteristic] = useState(newMinion ?? DefaultMinion.create());

    return (
        <Grid item>
        </Grid>
    )
}

interface CharacteristcsRowProps {
    characteristic: Characteristics
}

function CharacteristicRow(props: CharacteristcsRowProps): JSX.Element {

    return (
        <Grid item>
            <TextField name='name' label='Name' value={minion.name ?? ''} onBlur={handleBlur} onChange={handleTextChange} fullWidth />
        </Grid>
    )
}

interface Props {
    minion?: Minion | null,
}

export default function CreateMinion(props: Props) {
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