import {Card, CardContent, CardHeader, Grid, IconButton, TextField} from '@mui/material';
import * as React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {RootPath} from "../../services/Path";
import EditIcon from "@mui/icons-material/Edit";
import Career from '../../models/actor/player/Career';
import {Fragment, useEffect, useState} from "react";
import CheckIcon from "@mui/icons-material/Check";
import CareerService from '../../services/CareerService';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Autocomplete} from "@mui/lab";
import TableContainer from "@mui/material/TableContainer";
import SkillService from "../../services/SkillService";
import Skill from "../../models/actor/Skill";

export default function CareerPage() {
    const {id} = useParams<{ id: string }>()
    const [career, setCareer] = useState<Career | null>(null)
    const [skills, setSkills] = useState<Skill[]>([])
    let pathname = useLocation().pathname
    let navigate = useNavigate()
    let headers = ['Name']

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setCareer(await CareerService.getCareer(id))
        })()
    }, [id, setCareer])

    useEffect(() => {
        (async (): Promise<void> => {
            setSkills(await SkillService.getSkills())
        })()
    }, [])

    if (!career) {
        return <Fragment/>;
    }

    const onPageChange = () => {
        if (pathname.endsWith('/view')) {
            return (
                <IconButton title='Edit' size='small'
                            onClick={(): void => navigate(RootPath.Career + id + '/edit')}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        } else {
            return (
                <IconButton title='View' size='small'
                            onClick={(): void => navigate(RootPath.Career + id + '/view')}>
                    <CheckIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        }
    }

    const handleSkillChange = async (index: number, value: Skill) => {
        const updatedSkills = career.skills.map((row, i) =>
            i === index ? {...value} : row
        );
        setCareer(await CareerService.updateCareer({...career, skills: updatedSkills}));
    };

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={career.name} action={onPageChange()}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <TableContainer component={Paper}>
                        <Table>
                            {renderSingleRowTableHeader(headers)}
                            <TableBody>
                                {career.skills.map((skill, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Autocomplete
                                                options={skills}
                                                getOptionLabel={(option) => option.name}
                                                value={skill}
                                                onChange={(e, newValue) => handleSkillChange(index, newValue as Skill)}
                                                renderInput={(params) => <TextField {...params} label="Skill"
                                                                                    variant="outlined"/>}
                                                disabled={!pathname.endsWith(career.id + '/edit')}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </CardContent>
        </Card>
    )
}
