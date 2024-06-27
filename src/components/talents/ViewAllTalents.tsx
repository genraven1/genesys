import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Talent from '../../models/Talent';
import TalentService from '../../services/TalentService';
import {Fragment, useEffect, useState} from 'react';
import * as React from 'react';
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import ActionsTableCell from "../common/table/ActionsTableCell";
import {RootPath} from "../../services/RootPath";
import Setting from "../../models/Setting";
import SettingService from "../../services/SettingService";
import {renderHeaders} from "../common/table/TableRenders";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import TalentDialog from "./TalentDialog";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import SettingTableCell from "../common/table/SettingsTableCell";

interface Props {
    talent: Talent
    setting: Setting
    columns: number
}

function Row(props: Props): JSX.Element {
    const {talent, setting, columns} = props
    const [open, setOpen] = useState(false)

    const renderRanked = (): string => {
        let ranked = 'No'
        if (talent?.ranked!!) {
            ranked = 'Yes'
        }
        return ranked
    }

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={talent.name}/>
                <TypographyCenterTableCell value={renderRanked()}/>
                <TypographyCenterTableCell value={talent.activation}/>
                <TypographyCenterTableCell value={talent.tier}/>
                <SettingTableCell settings={talent.settings} setting={setting}/>
                <ActionsTableCell name={talent.name} path={RootPath.Talent}/>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table sx={{ margin: 1 }}>
                            <TableBody>
                                <GenesysDescriptionTypography text={talent.description}/>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function ViewAllTalents() {
    const [talents, setTalents] = useState<Talent[]>([])
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false)
    const [setting, setSetting] = useState<Setting>()
    const headers = ['Name', 'Ranked', 'Activation', 'Tier', 'Active', 'View']

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
            const talentList = await TalentService.getTalents()
            if (!talentList) {
                return
            }
            setTalents(talentList)
        })()
    }, [])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Talents'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenTalentCreationDialog(true)}>Create Talent</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            {renderHeaders(headers)}
                        </TableHead>
                        <TableBody>
                            {talents.map((talent: Talent) => (
                                <Row key={talent.name} talent={talent} setting={setting!!} columns={headers.length}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openTalentCreationDialog && <TalentDialog open={openTalentCreationDialog}
                                                       onClose={(): void => setOpenTalentCreationDialog(false)}/>}
        </Card>
    );
}
