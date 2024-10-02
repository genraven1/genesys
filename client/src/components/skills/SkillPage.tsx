import Skill, {SkillType} from "../../models/actor/Skill";
import {Card, CardContent, CardHeader, Grid, IconButton, TextField} from "@mui/material";
import {RootPath} from "../../services/Path";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import {Autocomplete} from "@mui/lab";
import {Fragment, useEffect, useState} from "react";
import SkillService from "../../services/SkillService";
import {CharacteristicType} from "../../models/character/Characteristic";

export default function SkillPage() {
    const {id} = useParams<{ id: string }>()
    const [skill, setSkill] = useState<Skill | null>(null)
    let navigate = useNavigate()
    let pathname = useLocation().pathname

    useEffect(() => {
        if (!id) {
            return;
        }
        (async (): Promise<void> => {
            setSkill(await SkillService.getSkill(id));
        })()
    }, [id, setSkill]);

    if (!skill) {
        return <Fragment/>;
    }

    const onPageChange = () => {
        if (pathname.endsWith('/view')) {
            return (
                <IconButton title='Edit' size='small'
                            onClick={(): void => navigate(RootPath.Skills + id + '/edit')}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        } else {
            return (
                <IconButton title='View' size='small'
                            onClick={(): void => navigate(RootPath.Skills + id + '/view')}>
                    <CheckIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        }
    }

    const handleSkillTypeChange = async (value: SkillType) => {
        if (skill) {
            const updatedSkill = {...skill, type: value};
            setSkill(await SkillService.updateSkill(updatedSkill));
        }
    };

    const handleCharacteristicTypeChange = async (value: CharacteristicType) => {
        if (skill) {
            const updatedSkill = {...skill, characteristic: value};
            setSkill(await SkillService.updateSkill(updatedSkill));
        }
    };

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={skill.name} action={onPageChange()}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid item xs>
                        <Autocomplete
                            options={Object.values(SkillType)}
                            getOptionLabel={(option) => option}
                            value={skill.type}
                            onChange={(e, newValue) => handleSkillTypeChange(newValue as SkillType)}
                            renderInput={(params) => <TextField {...params} label="Skill Type"
                                                                variant="outlined"/>}
                            disabled={pathname.endsWith('/view')}
                        />
                    </Grid>
                    <Grid item xs>
                        <Autocomplete
                            options={Object.values(CharacteristicType)}
                            getOptionLabel={(option) => option}
                            value={skill.characteristic}
                            onChange={(e, newValue) => handleCharacteristicTypeChange(newValue as CharacteristicType)}
                            renderInput={(params) => <TextField {...params} label="Characteristic Type"
                                                                variant="outlined"/>}
                            disabled={pathname.endsWith('/view')}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}