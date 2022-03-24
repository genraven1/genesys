import { Button, Card, CardActions, CardContent, CardHeader, MenuItem, TextField } from "@mui/material";
import { ChangeEventHandler, FocusEventHandler, FormEventHandler, useState } from "react";
import Talent, { DefaultTalent } from "../models/Talent";
import TalentService from "../services/TalentService";

enum Ranked {
    No = 'No',
    Yes = 'Yes'
};

interface Props {
    talent?: Talent | null,
}

export default function CreateTalent(props: Props) {
    const { talent: newTalent } = props;
    const [talent, setTalent] = useState(newTalent ?? DefaultTalent.create());
    const [errors, setErrors] = useState({} as any);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setTalent((prev_state) => ({
            ...prev_state,
            [talent.experience]: talent.tier * 5,
        }));
        console.log(talent);
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;

        setTalent((prev_state) => ({
            ...prev_state,
            [name]: value,
        }));
    }

    const handleTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;

        setTalent((prev_state) => ({
            ...prev_state,
            [name]: value,
        }));
    }

    const handleRankedChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;

        setTalent((prev_state) => ({
            ...prev_state,
            ranked: value === Ranked.Yes,
        }));
    }

    return (
        <Card>
            <CardHeader title={'Create Talent'} />
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <TextField name='name' label='Name' value={talent.name ?? ''} onBlur={handleBlur} onChange={handleTextChange} />
                    <TextField name='ranked' label='Ranked' value={talent.ranked ?? Ranked.No} onBlur={handleBlur} onChange={handleRankedChange} select >
                        {Object.entries(Ranked).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>
                </CardContent>
                <CardActions>
                    <Button color='primary' type='submit'>SAVE</Button>
                </CardActions>
            </form>
        </Card>
    )
}

