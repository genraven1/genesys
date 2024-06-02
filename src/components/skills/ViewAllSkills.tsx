import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react';
import * as React from 'react';
import Skill from "../../models/actor/Skill";
import SkillService from "../../services/SkillService";
import ActionsTableCell from "../common/table/ActionsTableCell";
import {Path} from "../../services/Path";
import {renderHeaders} from "../common/table/TableRenders";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import {Button, Card, CardContent, CardHeader, Divider} from "@mui/material";
import CreateSkillDialog from "./CreateSkillDialog";
import {useFetchCurrentSetting} from "../setting/SettingWorkflow";
import SettingTableCell from "../common/table/SettingsTableCell";

interface Props {
    skill: Skill
}

function Row(props: Props): JSX.Element {
    const {skill} = props

    return (
        <TableRow key={skill.name}>
            <TypographyCenterTableCell value={skill.name}/>
            <TypographyCenterTableCell value={skill.type}/>
            <TypographyCenterTableCell value={skill.characteristic}/>
            <SettingTableCell settings={skill.settings} setting={useFetchCurrentSetting()}/>
            <ActionsTableCell name={skill.name} path={Path.Skills}/>
        </TableRow>
    )
}

export default function ViewAllSkills() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [openSkillCreationDialog, setOpenSkillCreationDialog] = useState(false)
    const headers = ['Name', 'Type', 'Linked Characteristic', 'Active', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            const skillList = await SkillService.getSkills()
            if (!skillList) {
                return
            }
            setSkills(skillList)
        })()
    }, [])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Skills'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenSkillCreationDialog(true)}>Create Skill</Button>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            {renderHeaders(headers)}
                        </TableHead>
                        <TableBody>
                            {skills.sort((a, b) => a.name.localeCompare(b.name)).map((skill: Skill) => (
                                <Row skill={skill}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openSkillCreationDialog && <CreateSkillDialog open={openSkillCreationDialog}
                                                           onClose={(): void => setOpenSkillCreationDialog(false)}/>}
        </Card>
    )
}