import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Talent, { Activation, Ranked, TalentKey, Tier } from "../../models/Talent";
import TalentService from "../../services/TalentService";
import { useParams } from "react-router-dom";
import InputTextFieldCard from "../input/InputTextFieldCard";
import InputSelectField from "../input/InputSelectField";

const RANKED_OPTIONS = rankedOptions()

function rankedOptions() {
    const array = [];

    for (const [key, value] of Object.entries(Ranked)) {
        if (!Number.isNaN(Number(key))) {
            continue;
        }
        array.push({ value: key, label: value });
    }
    return array;
}

const ACTIVATION_OPTIONS = activationOptions()

function activationOptions() {
    const array = [];

    for (const [key, value] of Object.entries(Activation)) {
        if (!Number.isNaN(Number(key))) {
            continue;
        }
        array.push({ value: key, label: value });
    }
    return array;
};

const TIER_OPTIONS = tierOptions()

function tierOptions() {
    const array = [];

    for (const [key, value] of Object.entries(Tier)) {
        if (!Number.isNaN(Number(key))) {
            continue;
        }
        array.push({ value: key, label: value });
    }
    return array;
};

export default function TalentView() {
    const { name } = useParams<{ name: string }>();
    const [talent, setTalent] = useState<Talent | null>(null);
    const [errors, setErrors] = useState({} as any);

    useEffect(() => {
        if (!name) {
            return;
        }
        (async (): Promise<void> => {
            const talentData = await TalentService.getTalent(name);
            setTalent(talentData)
        })();
    }, [name])

    const onChange = async (key: keyof Talent, value: string) => {
        if (value.trim().length === 0 || (talent !== null && talent[key] === value)) {
            return;
        }
        const copyTalent = { ...talent } as Talent;
        switch (key) {
            case TalentKey.Description:
                copyTalent.description = value
                break;
            case TalentKey.Ranked:
                copyTalent.ranked = value as Ranked
                break;
            case TalentKey.Activation:
                copyTalent.activation = value as Activation
                break;
            case TalentKey.Tier:
                copyTalent.tier = value as Tier
                break;
        }
        setTalent(copyTalent)

        await TalentService.updateTalent(copyTalent.name, copyTalent);
    }

    function getName(talent: Talent | null): string {
        if (!talent) {
            return 'Talent View'
        }
        return talent.name
    }

    return (
        <Card>
            <CardHeader title={getName(talent)} />
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <InputTextFieldCard defaultValue={'Description'} onCommit={(value: string): void => { onChange(TalentKey.Description, value) }} title={'Description'} helperText={'Description'} placeholder={'Description'} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <Grid item xs>
                            <Card>
                                <CardHeader title={'Ranked'} style={{ textAlign: 'center' }} />
                                <Divider />
                                <InputSelectField defaultValue={talent?.ranked || ''} options={RANKED_OPTIONS} onCommit={(value: string): void => { onChange(TalentKey.Ranked, value) }} />
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card>
                                <CardHeader title={'Activation'} style={{ textAlign: 'center' }} />
                                <Divider />
                                <InputSelectField defaultValue={talent?.activation || ''} options={ACTIVATION_OPTIONS} onCommit={(value: string): void => { onChange(TalentKey.Activation, value) }} />
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card>
                                <CardHeader title={'Tier'} style={{ textAlign: 'center' }} />
                                <Divider />
                                <InputSelectField defaultValue={talent?.tier || ''} options={TIER_OPTIONS} onCommit={(value: string): void => { onChange(TalentKey.Tier, value) }} />
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
