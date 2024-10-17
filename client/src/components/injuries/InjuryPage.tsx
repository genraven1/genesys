import Injury from "../../models/Injury";
import {Card, CardContent, Divider, Grid} from "@mui/material";
import * as React from "react";
import {useLocation, useParams} from "react-router-dom";
import {RootPath} from "../../services/Path";
import CriticalInjuryModifierCard from "./modifiers/CriticalInjuryModifierCard";
import {Fragment, useEffect, useState} from "react";
import InjuryService from "../../services/InjuryService";
import {Difficulty} from "../../models/common/Difficulty";
import {ViewFieldCard} from "../common/ViewFieldCard";
import CenteredCardHeaderWithAction from "../common/card/CenteredCardHeaderWithAction";
import DifficultyCard from "../common/card/select/DifficultyCard";
import {NumberTextFieldCard} from "../common/card/NumberTextField";
import {TextFieldCard} from "../common/card/TextFieldCard";

export default function InjuryPage() {
    const {id} = useParams<{ id: string }>();
    const [injury, setInjury] = useState<Injury | null>(null);
    let pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return;
        }
        (async (): Promise<void> => {
            setInjury(await InjuryService.getInjury(id));
        })()
    }, [id, setInjury])

    if (!injury) {
        return <Fragment/>;
    }

    const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (injury) {
            setInjury(await InjuryService.updateInjury({...injury, description: event.target.value}));
        }
    };

    const handleSeverityChange = async (value: Difficulty) => {
        if (injury) {
            setInjury(await InjuryService.updateInjury({...injury, severity: value}));
        }
    };

    const handleMinChange = async (value: number) => {
        if (injury) {
            setInjury(await InjuryService.updateInjury({...injury, min: value}));
        }
    };

    const handleMaxChange = async (value: number) => {
        if (injury) {
            setInjury(await InjuryService.updateInjury({...injury, max: value}));
        }
    };

    const renderDescriptionCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Description"} value={injury.description}/> :
            <TextFieldCard title={"Description"} value={injury.description}
                           disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>;
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={injury.name} path={RootPath.Injury + injury.id}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <DifficultyCard value={injury.severity} onChange={handleSeverityChange}
                                        disabled={pathname.endsWith('/view')}/>
                        <NumberTextFieldCard title={"Min"} value={injury.min} onChange={handleMinChange} min={0}
                                             max={150} disabled={pathname.endsWith('/view')}/>
                        <NumberTextFieldCard title={"Max"} value={injury.max} onChange={handleMaxChange} min={0}
                                             max={150} disabled={pathname.endsWith('/view')}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={2}>
                        {renderDescriptionCard()}
                    </Grid>
                    <CriticalInjuryModifierCard crit={injury}/>
                </Grid>
            </CardContent>
        </Card>
    )
}