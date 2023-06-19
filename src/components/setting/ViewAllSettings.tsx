import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
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
import {Button, Card, CardContent, CardHeader, Divider} from "@mui/material";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import SettingDialog from "./SettingDialog";

function Row(props: { row: Setting }): JSX.Element {
    const {row} = props

    const renderSettingMagicTableCell = (): JSX.Element => {
        if (row?.magic!!) {
            return <TypographyCenterTableCell value={'True'}/>
        }
        else {
            return <TypographyCenterTableCell value={'False'}/>
        }
    }

    return (
        <TableRow>
            <TypographyCenterTableCell value={row.name}/>
            {renderSettingMagicTableCell()}
            <ActionsTableCell name={row.name} path={Path.Setting}/>
        </TableRow>
    )
}

export default function ViewAllSettings() {
    const [settings, setSettings] = useState<Setting[]>([])
    const [openSettingCreationDialog, setOpenSettingCreationDialog] = useState(false)

    useEffect(() => {
        (async (): Promise<void> => {
            const settingList = await SettingService.getSettings()
            if (!settingList) { return }
            setSettings(settingList)
        })()
    }, [])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Settings'}
                action={<Button color='primary' variant='contained' onClick={(): void => setOpenSettingCreationDialog(true)}>Create Setting</Button>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TypographyCenterTableCell value={'Name'}/>
                                <TypographyCenterTableCell value={'Magic'}/>
                                <TypographyCenterTableCell value={'View'}/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {settings.map((row: Setting) => (
                                <Row key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openSettingCreationDialog && <SettingDialog open={openSettingCreationDialog} onClose={(): void => setOpenSettingCreationDialog(false)}/>}
        </Card>
    )
}