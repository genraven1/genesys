import Setting from "../../models/Setting";
import {Fragment, useEffect, useState} from "react";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import SettingTableCell from "../common/table/SettingsTableCell";
import ActionsTableCell from "../common/table/ActionsTableCell";
import {RootPath} from "../../services/RootPath";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import SettingService from "../../services/SettingService";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import * as React from "react";
import Career from "../../models/actor/player/Career";
import CareerService from "../../services/CareerService";
import CareerDialog from "./CareerDialog";

interface Props {
    career: Career
    setting: Setting
    columns: number
}

function Row(props: Props): JSX.Element {
    const {career, setting, columns} = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={career.name}/>
                <SettingTableCell settings={career.settings} setting={setting}/>
                <ActionsTableCell name={career.name} path={RootPath.Career}/>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table sx={{ margin: 1 }}>
                            <TableBody>
                                {/*Insert Skill List*/}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function ViewAllCareers() {
    const [careers, setCareers] = useState<Career[]>([])
    const [openCareerCreationDialog, setOpenCareerCreationDialog] = useState(false)
    const [setting, setSetting] = useState<Setting>()
    const headers = ['Name', 'Active', 'View']

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
            const careerList = await CareerService.getCareers()
            if (!careerList) {
                return
            }
            setCareers(careerList)
        })()
    }, [])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Careers'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenCareerCreationDialog(true)}>Create Career</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {careers.map((career: Career) => (
                                <Row key={career.name} career={career} setting={setting!!} columns={headers.length}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openCareerCreationDialog && <CareerDialog open={openCareerCreationDialog}
                                                       onClose={(): void => setOpenCareerCreationDialog(false)}/>}
        </Card>
    );
}