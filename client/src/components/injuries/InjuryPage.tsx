import Injury from "../../models/Injury";
import {Card, CardContent, CardHeader, Divider, Grid, IconButton, TextField} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {RootPath} from "../../services/Path";
import CriticalInjuryModifierCard from "./modifiers/CriticalInjuryModifierCard";
import {Fragment, useEffect, useState} from "react";
import CheckIcon from "@mui/icons-material/Check";
import InjuryService from "../../services/InjuryService";
import {Autocomplete} from "@mui/lab";
import {Difficulty} from "../../models/common/Difficulty";
import {TextFieldCard, ViewFieldCard} from "../common/ViewFieldCard";

export default function InjuryPage() {
    const {id} = useParams<{ id: string }>()
    const [injury, setInjury] = useState<Injury | null>(null)
    let pathname = useLocation().pathname
    let navigate = useNavigate()

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setInjury(await InjuryService.getInjury(id))
        })()
    }, [id, setInjury])

    if (!injury) {
        return <Fragment/>;
    }

    const onPageChange = () => {
        if (pathname.endsWith('/view')) {
            return (
                <IconButton title='Edit' size='small'
                            onClick={(): void => navigate(RootPath.Injury + id + '/edit')}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        } else {
            return (
                <IconButton title='View' size='small'
                            onClick={(): void => navigate(RootPath.Injury + id + '/view')}>
                    <CheckIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        }
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

    const handleMinChange = async (value: string) => {
        if (injury) {
            setInjury(await InjuryService.updateInjury({...injury, min: Number(value)}));
        }
    };

    const handleMaxChange = async (value: string) => {
        if (injury) {
            setInjury(await InjuryService.updateInjury({...injury, max: Number(value)}));
        }
    };

    const renderDescriptionCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Description"} value={injury.description}/> :
            <TextFieldCard title={"Description"} value={injury.description}
                           disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>;
    };

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={injury.name} action={onPageChange()}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <Autocomplete
                                options={Object.values(Difficulty)}
                                getOptionLabel={(option) => option}
                                value={injury.severity}
                                onChange={(e, newValue) => handleSeverityChange(newValue as Difficulty)}
                                renderInput={(params) => <TextField {...params} label="Severity"
                                                                    variant="outlined"/>}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                type="number"
                                value={injury.min}
                                label="Min"
                                onChange={(e) => handleMinChange(e.target.value)}
                                inputProps={{min: 0, max: 150}}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                type="number"
                                value={injury.max}
                                label="Max"
                                onChange={(e) => handleMaxChange(e.target.value)}
                                inputProps={{min: 0, max: 150}}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
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