import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "./card/CenteredCardHeader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "./table/TypographyTableCell";
import CheckboxTableCell from "./table/CheckboxTableCell";
import Setting from "../../models/Setting";

interface Props {
    names: string[]
    onSettingAddition: (name: string) => void
    onSettingRemoval: (name: string) => void
    settings: Setting[]
}

export default function EditSettingsCard(props: Props): JSX.Element {
    const {names, onSettingAddition, onSettingRemoval, settings} = props

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Settings'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {(settings || [])!!.map((setting: Setting) => (
                                <TableRow>
                                    <TypographyCenterTableCell value={setting.name}/>
                                    <CheckboxTableCell value={names!!.includes(setting.name)}
                                                       onAddition={() => onSettingAddition(setting.name)}
                                                       onRemoval={() => onSettingRemoval(setting.name)}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}