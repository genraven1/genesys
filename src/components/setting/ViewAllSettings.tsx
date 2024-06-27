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
import {RootPath} from "../../services/RootPath";
import {Button, Card, CardContent, CardHeader, Divider} from "@mui/material";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import SettingDialog from "./SettingDialog";
import {renderHeaders} from "../common/table/TableRenders";

interface Props {
    setting: Setting
}

function Row(props: Props): JSX.Element {
    const {setting} = props

    const renderSettingMagicTableCell = (): JSX.Element => {
        if (setting?.magic!!) {
            return <TypographyCenterTableCell value={'True'}/>
        }
        else {
            return <TypographyCenterTableCell value={'False'}/>
        }
    }

    return (
        <TableRow>
            <TypographyCenterTableCell value={setting.name}/>
            {renderSettingMagicTableCell()}
            <ActionsTableCell name={String(setting.name)} path={RootPath.Setting}/>
        </TableRow>
    )
}

export default function ViewAllSettings() {
    const [settings, setSettings] = useState<Setting[]>([])
    const [openSettingCreationDialog, setOpenSettingCreationDialog] = useState(false)
    const headers = ['Name', 'Magic', 'View']

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
                            {renderHeaders(headers)}
                        </TableHead>
                        <TableBody>
                            {settings.map((setting: Setting) => (
                                <Row key={setting.name} setting={setting} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openSettingCreationDialog && <SettingDialog open={openSettingCreationDialog} onClose={(): void => setOpenSettingCreationDialog(false)}/>}
        </Card>
    )
}