import { Button, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import Talent, { DefaultTalent } from "../models/Talent";
import TalentService from "../services/TalentService";

function isValidValue(value: any): boolean {
    if (typeof value === 'string') {
        return !!value.trim();
    }
    return !!value;
}

export const useFormControls = () => {
    const [talent, setTalent] = useState(DefaultTalent.create());
    const [errors, setErrors] = useState({} as any);
    const validate: any = (talent: Talent) => {
        let temp: any = { ...errors }

        for (let key in Object.keys(talent)) {
            switch (key) {
                case 'name':
                    return isValidValue(talent.name)
                case 'ranked':
                    return isValidValue(talent.ranked)
                case 'activation':
                    return isValidValue(talent.activation)
                case 'tier':
                    return isValidValue(talent.tier)
                case 'description':
                    return isValidValue(talent.description)
            }
        }

        setErrors({
            ...temp
        });
    }
    const handleInputValue = (e: any) => {
        const { name, value } = e.target;
        setTalent({
            ...talent,
            [name]: value
        });
        validate({ [name]: value });
    };
    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        if (formIsValid()) {
            console.log(talent);
            // const createdTalent = await TalentService.createTalent(talent);
            // console.log(createdTalent);
            alert("You've posted your form!")
        }
    };
    const formIsValid = (talentValues = talent) => {
        const isValid =
            talentValues.name &&
            talentValues.ranked &&
            talentValues.activation &&
            talentValues.tier &&
            talentValues.description &&
            Object.values(errors).every((x) => x === "");

        return isValid;
    };
    return {
        handleInputValue,
        handleFormSubmit,
        formIsValid,
        errors
    };
}

export default function CreateTalent() {
    const [talent, setTalent] = useState(DefaultTalent.create());
    const {
        handleInputValue,
        handleFormSubmit,
        formIsValid,
        errors
    } = useFormControls();

    return (
        <form onSubmit={handleFormSubmit}>
            <Card>
                <CardHeader title='Create a Talent'>
                </CardHeader>
                <CardContent>
                    {/* Text */}
                    <TextField label='Name' type='text' value={talent.name} onChange={handleInputValue} />
                    {/* Toggle */}
                    <TextField label='Ranked' type='text' value={talent.ranked} onChange={handleInputValue} />
                    {/* Selection */}
                    <FormControl sx={{ minWidth: 180 }}>
                        <InputLabel>Activation</InputLabel>
                        <Select value={talent.activation} name='activation' onChange={handleInputValue}>
                            <MenuItem value={talent.activation}>Passive</MenuItem>
                            <MenuItem value={talent.activation}>Active</MenuItem>
                        </Select>
                    </FormControl>
                    {/* Number */}
                    <TextField label='Tier' type='number' value={talent.tier} onChange={handleInputValue} />
                    {/* Text Multi */}
                    <TextField label='Description' type='text' value={talent.description} multiline onChange={handleInputValue} />
                </CardContent>
                <Button color='primary' variant='contained' type="submit">Submit</Button>
            </Card>
        </form>
    )
}

