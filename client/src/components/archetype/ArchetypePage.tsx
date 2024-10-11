import {Card, CardContent, CardHeader, Grid, IconButton} from '@mui/material';
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
import {
    CharacteristicCard,
    NumberTextFieldCard,
    SkillAutocompleteCard,
    TextFieldCard,
    ViewFieldCard
} from "../common/ViewFieldCard";

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

    const handleDescriptionChange = async (value: string) => {
        if (archetype) {
            setArchetype(await ArchetypeService.updateArchetype({...archetype, description: value}));
        }
    };

    const handleCharacteristicChange = async (characteristic: CharacteristicType, value: number) => {
        if (archetype) {
            switch (characteristic) {
                case CharacteristicType.Brawn:
                    setArchetype(await ArchetypeService.updateArchetype({...archetype, brawn: value}));
                    break;
                case CharacteristicType.Agility:
                    setArchetype(await ArchetypeService.updateArchetype({...archetype, agility: value}));
                    break;
                case CharacteristicType.Intellect:
                    setArchetype(await ArchetypeService.updateArchetype({...archetype, intellect: value}));
                    break;
                case CharacteristicType.Cunning:
                    setArchetype(await ArchetypeService.updateArchetype({...archetype, cunning: value}));
                    break;
                case CharacteristicType.Willpower:
                    setArchetype(await ArchetypeService.updateArchetype({...archetype, willpower: value}));
                    break;
                case CharacteristicType.Presence:
                    setArchetype(await ArchetypeService.updateArchetype({...archetype, presence: value}));
                    break;
            }
        }
    };

    const handleSkillChange = async (value: Skill) => {
        if (archetype) {
            setArchetype(await ArchetypeService.updateArchetype({...archetype, skill: value}));
        }
    };

    const handleWoundsChange = async (value: number) => {
        if (archetype) {
            setArchetype(await ArchetypeService.updateArchetype({...archetype, wounds: value}));
        }
    };

    const handleStrainChange = async (value: number) => {
        if (archetype) {
            setArchetype(await ArchetypeService.updateArchetype({...archetype, strain: value}));
        }
    };

    const handleExperienceChange = async (value: number) => {
        if (archetype) {
            setArchetype(await ArchetypeService.updateArchetype({...archetype, experience: value}));
        }
    };

    const renderDescriptionCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Description"} value={archetype.description}/> :
            <TextFieldCard title={"Description"} value={archetype.description}
                           disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>;
    }

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={archetype.name} action={onPageChange()}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container justifyContent={'center'}>
                        {renderDescriptionCard()}
                    </Grid>
                    <Grid container spacing={2}>
                        <CharacteristicCard type={CharacteristicType.Brawn} value={archetype.brawn}
                                            handleCharacteristicChange={handleCharacteristicChange}
                                            disabled={pathname.endsWith('/view')}/>
                        <CharacteristicCard type={CharacteristicType.Agility} value={archetype.agility}
                                            handleCharacteristicChange={handleCharacteristicChange}
                                            disabled={pathname.endsWith('/view')}/>
                        <CharacteristicCard type={CharacteristicType.Intellect} value={archetype.intellect}
                                            handleCharacteristicChange={handleCharacteristicChange}
                                            disabled={pathname.endsWith('/view')}/>
                        <CharacteristicCard type={CharacteristicType.Cunning} value={archetype.cunning}
                                            handleCharacteristicChange={handleCharacteristicChange}
                                            disabled={pathname.endsWith('/view')}/>
                        <CharacteristicCard type={CharacteristicType.Willpower} value={archetype.willpower}
                                            handleCharacteristicChange={handleCharacteristicChange}
                                            disabled={pathname.endsWith('/view')}/>
                        <CharacteristicCard type={CharacteristicType.Presence} value={archetype.presence}
                                            handleCharacteristicChange={handleCharacteristicChange}
                                            disabled={pathname.endsWith('/view')}/>
                    </Grid>
                    <Grid container justifyContent={'center'}>
                        <NumberTextFieldCard title={"Wound Threshold"} value={archetype.wounds}
                                             onChange={handleWoundsChange} min={7} max={13}
                                             disabled={pathname.endsWith('/view')}/>
                        <NumberTextFieldCard title={"Strain Threshold"} value={archetype.strain}
                                             onChange={handleStrainChange} min={7} max={13}
                                             disabled={pathname.endsWith('/view')}/>
                        <NumberTextFieldCard title={"Base Experience"} value={archetype.experience}
                                             onChange={handleExperienceChange} min={70} max={170}
                                             disabled={pathname.endsWith('/view')} steps={5}/>
                    </Grid>
                    <Grid container spacing={2}>
                        <SkillAutocompleteCard disabled={!pathname.endsWith(archetype.id + '/edit')}
                                               handleSkillChange={handleSkillChange} skills={skills}
                                               startingSkill={archetype.skill}/>
                    </Grid>
                </Grid>
                <ArchetypeAbilityCard archetype={archetype}/>
            </CardContent>
        </Card>
    )
}
