import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import * as React from 'react';
import SettingService from "../../services/SettingService";
import Setting from "../../models/Setting";
import ActionsTableCell from "../common/table/ActionsTableCell";
import {Path} from "../../services/Path";

function Row(props: { row: Setting }): JSX.Element {
    const {row} = props

    const renderSettingMagicTableCell = (): JSX.Element => {
        if (row?.magic!!) {
            return <TableCell>True</TableCell>
        }
        else {
            return <TableCell>False</TableCell>
        }
    }

    return (
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row">{row.name}</TableCell>
            {renderSettingMagicTableCell()}
            <ActionsTableCell name={String(row.id)} path={Path.Setting}/>
        </TableRow>
    )
}

export default function ViewAllSettings() {
    const [settings, setSettings] = useState<Setting[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const settingList = await SettingService.getSettings()
            if (!settingList) { return }
            setSettings(settingList)
        })()
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Setting Name</TableCell>
                        <TableCell>Magic</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {settings.map((row: Setting) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}