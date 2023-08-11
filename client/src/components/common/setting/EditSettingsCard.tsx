import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../card/CenteredCardHeader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../table/TypographyTableCell";
import CheckboxTableCell from "../table/CheckboxTableCell";
import Setting from "../../../models/Setting";

interface Props {
    settings: Setting[]
    onSettingAddition: (id: number) => void
    onSettingRemoval: (id: number) => void
    allSettings: Setting[]
}

export default function EditSettingsCard(props: Props): JSX.Element {
    const {settings, onSettingAddition, onSettingRemoval, allSettings} = props

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Settings'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {(allSettings || [])!!.map((setting: Setting) => (
                                <TableRow>
                                    <TypographyCenterTableCell value={setting.name}/>
                                    {console.log(settings)}
                                    <CheckboxTableCell value={settings!!.includes(setting)}
                                                       onAddition={() => onSettingAddition(setting.id)}
                                                       onRemoval={() => onSettingRemoval(setting.id)}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}