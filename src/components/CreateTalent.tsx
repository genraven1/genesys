import { Button, Card, CardActions, CardContent, CardHeader, MenuItem, TextField } from "@mui/material";
import { ChangeEventHandler, FocusEventHandler, FormEventHandler, useState } from "react";
import Talent, { Activation, DefaultTalent, Ranked, Tier } from "../models/Talent";
import TalentService from "../services/TalentService";

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
            [talent.experience]: +talent.tier * 5,
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
        let temp_ranked: Ranked;

        if (value == Ranked.No) {
            temp_ranked = Ranked.No;
        } else if (value == Ranked.Yes) {
            temp_ranked = Ranked.Yes
        }

        setTalent((prev_state) => ({
            ...prev_state,
            ranked: temp_ranked,
        }));
    }

    const handleActivationChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;
        let temp_activation: Activation;

        if (value == Activation.Passive) {
            temp_activation = Activation.Passive;
        } else if (value == Activation.ActiveAction) {
            temp_activation = Activation.ActiveAction
        } else if (value == Activation.ActiveManeuver) {
            temp_activation = Activation.ActiveManeuver
        } else if (value == Activation.ActiveIncidental) {
            temp_activation = Activation.ActiveIncidental
        } else if (value == Activation.ActiveIncidentalOutOfTurn) {
            temp_activation = Activation.ActiveIncidentalOutOfTurn
        }

        setTalent((prev_state) => ({
            ...prev_state,
            activation: temp_activation,
        }));
    }

    const handleTierChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target;
        let temp_tier: Tier;

        if (value == Tier.First) {
            temp_tier = Tier.First;
        } else if (value == Tier.Second) {
            temp_tier = Tier.Second
        } else if (value == Tier.Third) {
            temp_tier = Tier.Third
        } else if (value == Tier.Fourth) {
            temp_tier = Tier.Fourth
        } else if (value == Tier.Fifth) {
            temp_tier = Tier.Fifth
        }

        setTalent((prev_state) => ({
            ...prev_state,
            tier: temp_tier,
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
                    <TextField name='activation' label='Activation' value={talent.activation ?? Activation.Passive} onBlur={handleBlur} onChange={handleActivationChange} select >
                        {Object.entries(Activation).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField name='tier' label='Tier' value={talent.tier ?? Tier.First} onBlur={handleBlur} onChange={handleTierChange} select >
                        {Object.entries(Tier).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField name='description' label='Description' value={talent.description ?? ''} onBlur={handleBlur} onChange={handleTextChange} multiline />
                </CardContent>
                <CardActions>
                    <Button color='primary' type='submit'>SAVE</Button>
                </CardActions>
            </form>
        </Card>
    )
}

