import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Fragment, useEffect, useState} from 'react';
import * as React from 'react';
import ActionsTableCell from "../common/table/ActionsTableCell";
import {Path} from "../../services/Path";
import Setting from "../../models/Setting";
import SettingService from "../../services/SettingService";
import {renderHeaders} from "../common/table/TableRenders";
import {Button, Card, CardContent, CardHeader, Divider} from "@mui/material";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import ArchetypeService from "../../services/ArchetypeService";
import Archetype from "../../models/actor/player/Archetype";
import CreateArchetypeDialog from "./CreateArchetypeDialog";

interface Props {
    archetype: Archetype
    setting: Setting
    columns: number
}

function Row(props: Props): JSX.Element {
    const {archetype, setting, columns} = props
    const [open, setOpen] = useState(false)

    const renderSettingTableCell = ():JSX.Element => {
        let value = "No"
        if (archetype?.settings!!.includes(setting?.name!!)) {
            value = "Yes"
        }
        return <TypographyCenterTableCell value={value}/>
    }

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={archetype.name}/>
                {renderSettingTableCell()}
                <ActionsTableCell name={archetype.name} path={Path.Talent}/>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table sx={{ margin: 1 }}>
                            <TableBody>
                                {/*<GenesysDescriptionTypography text={talent.description}/>*/}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function ViewAllArchetypes() {
    const [archetypes, setArchetypes] = useState<Archetype[]>([])
    const [openArchetypeCreationDialog, setOpenArchetypeCreationDialog] = useState(false)
    const [setting, setSetting] = useState<Setting>()
    const headers = ['Name', 'Setting', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            const currentSetting = await SettingService.getCurrentSetting()
            if (!currentSetting) {
                return
            }
            setSetting(currentSetting)
        })()
    }, [setSetting])

    useEffect(() => {
        (async (): Promise<void> => {
            const archetypeList = await ArchetypeService.getArchetypes()
            if (!archetypeList) {
                return
            }
            setArchetypes(archetypeList)
        })()
    }, [])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Archetypes'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenArchetypeCreationDialog(true)}>Create Archetype</Button>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            {renderHeaders(headers)}
                        </TableHead>
                        <TableBody>
                            {archetypes.map((archetype: Archetype) => (
                                <Row key={archetype.name} archetype={archetype} setting={setting!!} columns={headers.length}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openArchetypeCreationDialog && <CreateArchetypeDialog open={openArchetypeCreationDialog}
                                                       onClose={(): void => setOpenArchetypeCreationDialog(false)}/>}
        </Card>
    );
}
