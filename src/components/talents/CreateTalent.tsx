import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { FormEventHandler, useState } from "react";
import Talent, { Activation, DefaultTalent, Ranked, TalentKey, Tier } from "../../models/Talent";
import TalentService from "../../services/TalentService";
import { useNavigate } from "react-router-dom";
import InputTextFieldCard from "../input/InputTextFieldCard";
import InputSelectField from "../input/InputSelectField";

interface Props {
    talent?: Talent | null,
}

const RANKED_OPTIONS = function () {
    const array = [];

    for (const [key, value] of Object.entries(Ranked)) {
        if (!Number.isNaN(Number(key))) {
            continue;
        }
        array.push({ value: key, label: value });
    }
    return array;
}

const ACTIVATION_OPTIONS = function () {
    const array = [];

    for (const [key, value] of Object.entries(Activation)) {
        if (!Number.isNaN(Number(key))) {
            continue;
        }
        array.push({ value: key, label: value });
    }
    return array;
};

const TIER_OPTIONS = function () {
    const array = [];

    for (const [key, value] of Object.entries(Tier)) {
        if (!Number.isNaN(Number(key))) {
            continue;
        }
        array.push({ value: key, label: value });
    }
    return array;
};

export default function CreateTalent(props: Props) {
    const { talent: newTalent } = props;
    const [talent, setTalent] = useState(newTalent ?? DefaultTalent.create());
    const [errors, setErrors] = useState({} as any);
    let navigate = useNavigate();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log(talent);
        //TalentService.createTalent(talent);
        //navigate('/talents');
    }

    const onChange = (key: keyof Talent, value: string) => {
        if (value.trim().length === 0 || talent[key] === value) {
            return;
        }
        switch (key) {
            case TalentKey.Name:
                setTalent((prev_state) => ({
                    ...prev_state,
                    name: value,
                }));
                return;
            case TalentKey.Description:
                setTalent((prev_state) => ({
                    ...prev_state,
                    description: value,
                }));
                return;
            case TalentKey.Ranked:
                onRankedChange(value);
                return;
            case TalentKey.Activation:
                onActivationChange(value);
                return;
            case TalentKey.Tier:
                onTierChange(value);
                return;
        }
    }

    const onRankedChange = (value: string) => {
        if (value === Ranked.No) {
            setTalent((prev_state) => ({
                ...prev_state,
                ranked: Ranked.No,
            }));
        } else if (value === Ranked.Yes) {
            setTalent((prev_state) => ({
                ...prev_state,
                ranked: Ranked.Yes,
            }));
        }
    }

    const onActivationChange = (value: string) => {
        if (value === Activation.Passive) {
            setTalent((prev_state) => ({
                ...prev_state,
                activation: Activation.Passive,
            }));
            console.log(value)
            console.log(talent)
        } else if (value === Activation.ActiveAction) {
            setTalent((prev_state) => ({
                ...prev_state,
                activation: Activation.ActiveAction,
            }));
            console.log(value)
            console.log(talent)
        } else if (value === Activation.ActiveManeuver) {
            setTalent((prev_state) => ({
                ...prev_state,
                activation: Activation.ActiveManeuver,
            }));
            console.log(value)
            console.log(talent)
        } else if (value === Activation.ActiveIncidental) {
            setTalent((prev_state) => ({
                ...prev_state,
                activation: Activation.ActiveIncidental,
            }));
            console.log(value)
            console.log(talent)
        } else if (value === Activation.ActiveIncidentalOutOfTurn) {
            setTalent((prev_state) => ({
                ...prev_state,
                activation: Activation.ActiveIncidentalOutOfTurn,
            }));
            console.log(value)
            console.log(talent)
        }
    }

    const onTierChange = (value: string) => {
        if (value === Tier.First) {
            setTalent((prev_state) => ({
                ...prev_state,
                tier: Tier.First,
            }));
        } else if (value === Tier.Second) {
            setTalent((prev_state) => ({
                ...prev_state,
                tier: Tier.Second,
            }));
        } else if (value === Tier.Third) {
            setTalent((prev_state) => ({
                ...prev_state,
                tier: Tier.Third,
            }));
        } else if (value === Tier.Fourth) {
            setTalent((prev_state) => ({
                ...prev_state,
                tier: Tier.Fourth,
            }));
        } else if (value === Tier.Fifth) {
            setTalent((prev_state) => ({
                ...prev_state,
                tier: Tier.Fifth,
            }));
        }
    }

    return (
        <Card>
            <CardHeader title={'Create Talent'} />
            <Divider />
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <Grid container justifyContent={'center'}>
                        <Grid container spacing={10}>
                            <InputTextFieldCard defaultValue={'Name'} onCommit={(value: string): void => { onChange(TalentKey.Name, value) }} title={'Name'} helperText={'Name'} placeholder={'Name'} />
                            <InputTextFieldCard defaultValue={'Description'} onCommit={(value: string): void => { onChange(TalentKey.Description, value) }} title={'Description'} helperText={'Description'} placeholder={'Description'} />
                        </Grid>
                        <Divider />
                        <Grid container spacing={10}>
                            {/* <Grid item xs>
                                <InputSelectField defaultValue={Ranked.No} options={RANKED_OPTIONS} onCommit={(value: string): void => { onChange(TalentKey.Ranked, value) }} />
                            </Grid>
                            <Grid item xs>
                                <InputSelectField defaultValue={Activation.Passive} options={ACTIVATION_OPTIONS} onCommit={(value: string): void => { onChange(TalentKey.Activation, value) }} />
                            </Grid>
                            <Grid item xs>
                                <InputSelectField defaultValue={Tier.First} options={TIER_OPTIONS} onCommit={(value: string): void => { onChange(TalentKey.Tier, value) }} />
                            </Grid> */}
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button color='primary' type='submit'>CREATE</Button>
                </CardActions>
            </form>
        </Card>
    )
}

