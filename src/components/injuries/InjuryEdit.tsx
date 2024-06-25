import {useEffect, useState} from "react";
import Injury from "../../models/Injury";
import {useNavigate} from "react-router-dom";
import {Path} from "../../services/Path";
import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {InputTextFieldCard} from "../common/InputTextFieldCard";
import InputSelectFieldCard from "../common/InlineSelectFieldCard";
import * as React from "react";
import {Difficulty, getDifficultyOptions} from "../../models/common/Difficulty";
import EditNumberCard from "../common/EditNumberCard";
import CriticalInjuryModifierCard from "./modifiers/CriticalInjuryModifierCard";

interface Props {
    crit: Injury
}

export default function InjuryEdit(props: Props): JSX.Element {
    const {crit} = props
    const [injury, setInjury] = useState<Injury>(crit)
    let navigate = useNavigate()

    useEffect(() => {
        setInjury(crit)
    }, [crit])

    const onChange = async (key: keyof Injury, value: string) => {
        if (value.trim().length === 0 || (injury !== null && injury!![key] === value)) {
            return
        }
        const copyInjury = {...injury} as Injury;
        switch (key) {
            case 'description':
                copyInjury.description = value
                break
            case "severity":
                copyInjury.severity = value as Difficulty
                break;
            case "min":
                copyInjury.min = Number(value)
                break;
            case "max":
                copyInjury.max = Number(value)
                break;
        }
        await updateInjury(copyInjury)
    }

    const updateInjury = async (copyInjury: Injury) => {
        setInjury(copyInjury)
        await fetch(`/injuries/${injury.injury_id}`, {method: 'PUT', body: JSON.stringify(copyInjury)})
            .then((res) => res.json())
            .then((data) => setInjury(data as Injury))
    }

    const onView = () => {
        navigate(Path.Injury + injury.injury_id + '/view');
    }

    return (
        <Card>
            <CardHeader title={injury.name} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <InputTextFieldCard defaultValue={injury?.description!!} onCommit={(value: string): void => {
                            onChange('description', value)
                        }} title={'Description'} helperText={'Description'} placeholder={'Description'}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={2}>
                        <InputSelectFieldCard defaultValue={injury.severity} onCommit={(value: string): void => {
                            onChange('severity', value)
                        }} title={'Severity'} options={getDifficultyOptions()}/>
                        <EditNumberCard title={'Min'} value={injury.min} onChange={(value: number): void => {
                            onChange('min', String(value))
                        }}/>
                        <EditNumberCard title={'Max'} value={injury.max} onChange={(value: number): void => {
                            onChange('max', String(value))
                        }}/>
                    </Grid>
                    <CriticalInjuryModifierCard injury={injury}/>
                </Grid>
            </CardContent>
        </Card>
    )
}