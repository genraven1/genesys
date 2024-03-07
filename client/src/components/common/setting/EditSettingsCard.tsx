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
import GenesysDescriptionTypography from "../typography/GenesysDescriptionTypography";

interface Props {
    settings: Setting[]
    onSettingAddition: (name: string) => void
    onSettingRemoval: (name: string) => void
    allSettings: Setting[]
}

export default function EditSettingsCard(props: Props): JSX.Element {
    const {settings, onSettingAddition, onSettingRemoval, allSettings} = props

    const renderTableBody = (): JSX.Element => {
        if (!settings) {
            return <GenesysDescriptionTypography text={'None'}/>
        } else {
            return (
                <TableBody>
                    {(allSettings || [])!!.map((setting: Setting) => (
                        <TableRow key={setting.name}>
                            <TypographyCenterTableCell value={setting.name}/>
                            <CheckboxTableCell value={settings!!.some(set => set.name === setting.name)}
                                               onAddition={() => onSettingAddition(setting.name)}
                                               onRemoval={() => onSettingRemoval(setting.name)}/>
                        </TableRow>
                    ))}
                </TableBody>
            )
        }
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Settings'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderTableBody()}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}