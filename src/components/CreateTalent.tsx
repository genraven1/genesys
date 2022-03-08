import { Button, Card, CardActions, CardContent, CardHeader, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import Talent, { DefaultTalent } from "../models/Talent";
import TalentService from "../services/TalentService";

interface TalentProps {
    talent?: Talent;
}

export default function CreateTalent(props: TalentProps) {
    const { talent: newTalent } = props;
    const [talent] = useState(newTalent || DefaultTalent.create());

    const createTalent = async (): Promise<void> => {
        try {
            const createdTalent = await TalentService.createTalent(talent);
            console.log(createdTalent);
        } catch (err) {

        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        console.log('Here');
        createTalent();
        return;
    }

    return (
        <form noValidate onSubmit={handleSubmit}>
            <Card>
                <CardHeader title='Create a Talent'>
                </CardHeader>
                <CardContent>
                    <TextField label='Name' value={newTalent?.name} />
                    <TextField label='Ranked' value={newTalent?.ranked} />
                    <TextField label='Activation' value={newTalent?.activation} />
                    <TextField label='Tier' value={newTalent?.tier} />
                    <TextField label='Description' value={newTalent?.description} multiline />
                </CardContent>
                <CardActions>
                    <Button color='primary' onSubmit={handleSubmit} variant='contained'>Submit</Button>
                </CardActions>
            </Card>
        </form>
    )
}

