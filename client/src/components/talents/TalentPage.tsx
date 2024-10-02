import {
    Card,
    CardContent,
    CardHeader,
    FormControl,
    Grid,
    IconButton, InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import Talent, {Activation, Tier} from "../../models/Talent";
import * as React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {RootPath} from "../../services/Path";
import EditIcon from "@mui/icons-material/Edit";
import {Fragment, useEffect, useState} from "react";
import TalentModifierCard from "./modifier/TalentModifierCard";
import CheckIcon from "@mui/icons-material/Check";
import TalentService from "../../services/TalentService";
import {Autocomplete} from "@mui/lab";

export default function TalentPage() {
    const {id} = useParams<{ id: string }>()
    const [talent, setTalent] = useState<Talent | null>(null)
    let pathname = useLocation().pathname
    let navigate = useNavigate()

    useEffect(() => {
        if (!id) {
            return;
        }
        (async (): Promise<void> => {
            setTalent(await TalentService.getTalent(id));
        })()
    }, [id, setTalent]);

    if (!talent) {
        return <Fragment/>;
    }

    const onPageChange = () => {
        if (pathname.endsWith('/view')) {
            return (
                <IconButton title='Edit' size='small'
                            onClick={(): void => navigate(RootPath.Talent + id + '/edit')}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        } else {
            return (
                <IconButton title='View' size='small'
                            onClick={(): void => navigate(RootPath.Talent + id + '/view')}>
                    <CheckIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        }
    }

    const handleRankedChange = async (value: boolean) => {
        if (talent) {
            const updatedTalent = {...talent, ranked: value};
            setTalent(await TalentService.updateTalent(updatedTalent));
        }
    };

    const handleActivationChange = async (value: Activation) => {
        if (talent) {
            const updatedTalent = {...talent, activation: value};
            setTalent(await TalentService.updateTalent(updatedTalent));
        }
    };

    const handleTierChange = async (value: Tier) => {
        if (talent) {
            const updatedTalent = {...talent, tier: value};
            setTalent(await TalentService.updateTalent(updatedTalent));
        }
    };

    const handleSummaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (talent) {
            setTalent({...talent, summary: event.target.value});
        }
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (talent) {
            setTalent({...talent, description: event.target.value});
        }
    };

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={talent.name} action={onPageChange()}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <FormControl fullWidth>
                                <InputLabel>Ranked</InputLabel>
                                <Select
                                    value={talent.ranked ? 'Yes' : 'No'}
                                    onChange={(e) => handleRankedChange(e.target.value === 'Yes')}
                                    label="Ranked"
                                    disabled={pathname.endsWith('/view')}
                                >
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <Autocomplete
                                options={Object.values(Activation)}
                                getOptionLabel={(option) => option}
                                value={talent.activation}
                                onChange={(e, newValue) => handleActivationChange(newValue as Activation)}
                                renderInput={(params) => <TextField {...params} label="Activation"
                                                                    variant="outlined"/>}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                        <Grid item xs>
                            <Autocomplete
                                options={Object.values(Tier)}
                                getOptionLabel={(option) => option}
                                value={talent.tier}
                                onChange={(e, newValue) => handleTierChange(newValue as Tier)}
                                renderInput={(params) => <TextField {...params} label="Tier"
                                                                    variant="outlined"/>}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Grid item xs>
                        <TextField
                            label="Player Summary"
                            variant="outlined"
                            fullWidth
                            value={talent.summary}
                            onChange={handleSummaryChange}
                            disabled={pathname.endsWith('/view')}
                        />
                    </Grid>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Grid item xs>
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                            value={talent.description}
                            onChange={handleDescriptionChange}
                            disabled={pathname.endsWith('/view')}
                        />
                    </Grid>
                </Grid>
                <TalentModifierCard tal={talent}/>
            </CardContent>
        </Card>
    )
}
