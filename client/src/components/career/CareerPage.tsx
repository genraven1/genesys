import {Card, CardContent, Grid} from '@mui/material';
import * as React from "react";
import {useLocation, useParams} from "react-router-dom";
import {RootPath} from "../../services/Path";
import Career from '../../models/actor/player/Career';
import {Fragment, useEffect, useState} from "react";
import CareerService from '../../services/CareerService';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import SkillService from "../../services/SkillService";
import Skill from "../../models/actor/Skill";
import CenteredCardHeaderWithAction from "../common/card/CenteredCardHeaderWithAction";
import SkillAutocompleteTableCell from "../common/table/SkillAutocompleteTableCell";

export default function CareerPage() {
    const {id} = useParams<{ id: string }>();
    const [career, setCareer] = useState<Career | null>(null);
    const [skills, setSkills] = useState<Skill[]>([]);
    let pathname = useLocation().pathname;
    let headers = ['Skills'];

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setCareer(await CareerService.getCareer(id));
        })()
    }, [id, setCareer])

    useEffect(() => {
        (async (): Promise<void> => {
            setSkills(await SkillService.getSkills());
        })()
    }, [])

    if (!career) {
        return <Fragment/>;
    }

    const handleSkillChange = async (index: number, value: Skill) => {
        const updatedSkills = career.skills.map((row, i) =>
            i === index ? {...value} : row
        );
        setCareer(await CareerService.updateCareer({...career, skills: updatedSkills}));
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={career.name} path={RootPath.Career + career.id}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <TableContainer component={Paper}>
                        <Table>
                            {renderSingleRowTableHeader(headers)}
                            <TableBody>
                                {career.skills.map((skill, index) => (
                                    <TableRow key={index}>
                                        <SkillAutocompleteTableCell skill={skill} skills={skills}
                                                                    onChange={handleSkillChange} index={index}
                                                                    disabled={!pathname.endsWith(career.id + '/edit')}/>
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
