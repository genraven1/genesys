import {Autocomplete, Card, CardContent, CardHeader, Grid, IconButton, TextField} from '@mui/material';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import Archetype from "../../models/actor/player/Archetype";
import {RootPath} from "../../services/Path";
import {CharacteristicType} from "../../models/character/Characteristic";
import ArchetypeAbilityCard from "./ability/ArchetypeAbilityCard";
import {Fragment, useEffect, useState} from "react";
import SkillService from "../../services/SkillService";
import ArchetypeService from "../../services/ArchetypeService";
import Skill from "../../models/actor/Skill";
import CheckIcon from "@mui/icons-material/Check";
import {renderSkillName} from "../common/skill/SkillRenders";

export default function ArchetypePage() {
    const {id} = useParams<{ id: string }>()
    const [archetype, setArchetype] = useState<Archetype | null>(null)
    const [skills, setSkills] = useState<Skill[]>([])
    let pathname = useLocation().pathname
    let navigate = useNavigate()

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setArchetype(await ArchetypeService.getArchetype(id))
        })()
    }, [id, setArchetype])

    useEffect(() => {
        (async (): Promise<void> => {
            setSkills(await SkillService.getSkills())
        })()
    }, [])

    if (!archetype) {
        return <Fragment/>;
    }

    const onPageChange = () => {
        if (pathname.endsWith('/view')) {
            return (
                <IconButton title='Edit' size='small'
                            onClick={(): void => navigate(RootPath.Archetype + id + '/edit')}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>
            );
        } else {
            return (
                <IconButton title='View' size='small'
                            onClick={(): void => navigate(RootPath.Archetype + id + '/view')}>
                    <CheckIcon color='primary' fontSize='small'/>
                </IconButton>
            );
        }
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (archetype) {
            setArchetype({...archetype, description: event.target.value});
        }
    };

    const handleCharacteristicChange = async (characteristic: CharacteristicType, value: string) => {
        switch (characteristic) {
            case CharacteristicType.Brawn:
                setArchetype(await ArchetypeService.updateArchetype({...archetype, brawn: Number(value)}));
                break;
            case CharacteristicType.Agility:
                setArchetype(await ArchetypeService.updateArchetype({...archetype, agility: Number(value)}));
                break;
            case CharacteristicType.Intellect:
                setArchetype(await ArchetypeService.updateArchetype({...archetype, intellect: Number(value)}));
                break;
            case CharacteristicType.Cunning:
                setArchetype(await ArchetypeService.updateArchetype({...archetype, cunning: Number(value)}));
                break;
            case CharacteristicType.Willpower:
                setArchetype(await ArchetypeService.updateArchetype({...archetype, willpower: Number(value)}));
                break;
            case CharacteristicType.Presence:
                setArchetype(await ArchetypeService.updateArchetype({...archetype, presence: Number(value)}));
                break;

        }
    };

    const handleSkillChange = async (value: Skill) => {
        setArchetype(await ArchetypeService.updateArchetype({...archetype, skill: value}));
    };

    const handleWoundsChange = async (value: string) => {
        if (archetype) {
            setArchetype(await ArchetypeService.updateArchetype({...archetype, wounds: Number(value)}));
        }
    };

    const handleStrainChange = async (value: string) => {
        if (archetype) {
            setArchetype(await ArchetypeService.updateArchetype({...archetype, strain: Number(value)}));
        }
    };

    const handleExperienceChange = async (value: string) => {
        if (archetype) {
            setArchetype(await ArchetypeService.updateArchetype({...archetype, experience: Number(value)}));
        }
    };

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={archetype.name} action={onPageChange()}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container justifyContent={'center'}>
                        <Grid item xs>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={2}
                                value={archetype.description}
                                onChange={handleDescriptionChange}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <TextField
                                type="number"
                                value={archetype.brawn}
                                label={CharacteristicType.Brawn}
                                fullWidth
                                onChange={(e) => handleCharacteristicChange(CharacteristicType.Brawn, e.target.value)}
                                inputProps={{min: 1, max: 5}}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                type="number"
                                value={archetype.agility}
                                label={CharacteristicType.Agility}
                                fullWidth
                                onChange={(e) => handleCharacteristicChange(CharacteristicType.Agility, e.target.value)}
                                inputProps={{min: 1, max: 5}}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                type="number"
                                value={archetype.intellect}
                                label={CharacteristicType.Intellect}
                                fullWidth
                                onChange={(e) => handleCharacteristicChange(CharacteristicType.Intellect, e.target.value)}
                                inputProps={{min: 1, max: 5}}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                type="number"
                                value={archetype.cunning}
                                label={CharacteristicType.Cunning}
                                fullWidth
                                onChange={(e) => handleCharacteristicChange(CharacteristicType.Cunning, e.target.value)}
                                inputProps={{min: 1, max: 5}}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                type="number"
                                value={archetype.willpower}
                                label={CharacteristicType.Willpower}
                                fullWidth
                                onChange={(e) => handleCharacteristicChange(CharacteristicType.Willpower, e.target.value)}
                                inputProps={{min: 1, max: 5}}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                type="number"
                                value={archetype.presence}
                                label={CharacteristicType.Presence}
                                fullWidth
                                onChange={(e) => handleCharacteristicChange(CharacteristicType.Presence, e.target.value)}
                                inputProps={{min: 1, max: 5}}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={'center'}>
                        <Grid item xs>
                            <TextField
                                type="number"
                                value={archetype.wounds}
                                label="Wound Threshold"
                                fullWidth
                                onChange={(e) => handleWoundsChange(e.target.value)}
                                inputProps={{min: 7, max: 13}}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                type="number"
                                value={archetype.strain}
                                label="Strain Threshold"
                                fullWidth
                                onChange={(e) => handleStrainChange(e.target.value)}
                                inputProps={{min: 7, max: 13}}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <Autocomplete
                                options={skills}
                                getOptionLabel={(option) => renderSkillName(option)}
                                value={archetype.skill}
                                fullWidth
                                onChange={(e, newValue) => handleSkillChange(newValue as Skill)}
                                renderInput={(params) => <TextField {...params} label="Starting Skill"
                                                                    variant="outlined"/>}
                                disabled={!pathname.endsWith(archetype.id + '/edit')}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <TextField
                                type="number"
                                value={archetype.experience}
                                label="Base Experience"
                                fullWidth
                                onChange={(e) => handleExperienceChange(e.target.value)}
                                inputProps={{min: 70, max: 170, step: 5}}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <ArchetypeAbilityCard archetype={archetype}/>
            </CardContent>
        </Card>
    )
}
