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
import Setting from "../../models/Setting";
import SettingService from "../../services/SettingService";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";

interface Props {
    skill: Skill
    setting: Setting
}

function Row(props: Props): JSX.Element {
    const {skill, setting} = props

    const renderSettingTableCell = ():JSX.Element => {
        let value = "No"
        if (skill?.settings!!.includes(setting?.name!!)) {
            value = "Yes"
        }
        return <TypographyCenterTableCell value={value}/>
    }

    return (
        <TableRow>
            <TypographyCenterTableCell value={skill.name}/>
            <TypographyCenterTableCell value={skill.type}/>
            <TypographyCenterTableCell value={skill.characteristic}/>
            {renderSettingTableCell()}
            <ActionsTableCell name={skill.name} path={Path.Skills}/>
        </TableRow>
    )
}

export default function ViewAllSkills() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [setting, setSetting] = useState<Setting>()
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

    useEffect(() => {
        (async (): Promise<void> => {
            const currentSetting = await SettingService.getCurrentSetting()
            if (!currentSetting) {
                return
            }
            setSetting(currentSetting)
        })()
    }, [setSetting])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    {renderHeaders(headers)}
                </TableHead>
                <TableBody>
                    {skills.sort((a, b) => a.name.localeCompare(b.name)).map((skill: Skill) => (
                        <Row key={skill.name} skill={skill} setting={setting!!}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}