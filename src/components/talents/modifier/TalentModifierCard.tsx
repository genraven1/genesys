import {Button, Card, CardContent, TableFooter} from "@mui/material";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import {useLocation} from "react-router-dom";
import Modifier from "../../../models/common/Modifier";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import AddIcon from '@mui/icons-material/Add';
import {Fragment, useState} from "react";
import * as React from "react";
import AddTalentModifierDialog from "./AddTalentModifierDialog";
import Talent from "../../../models/Talent";

interface Props {
    talent: Talent
}

export default function TalentModifierCard(props: Props) {
    const {talent} = props
    const [openDialog, setOpenDialog] = useState(false)
    const pathname = useLocation().pathname
    const headers = ['Type', 'Ranks']

    const renderTableFooter = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <TableFooter>
                    <TableRow>
                        <Button variant='contained' color='primary' onClick={addRow} startIcon={<AddIcon/>}>Add
                            Modifier</Button>
                        {openDialog && <AddTalentModifierDialog open={openDialog}
                                                                onClose={(): void => setOpenDialog(false)}
                                                                talent={talent}/>}
                    </TableRow>
                </TableFooter>
            )
        } else {
            return <Fragment/>
        }
    }

    const addRow = () => {
        setOpenDialog(true)
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Modifiers'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {(talent.modifiers || []).map((modifier) => (
                                <ModifierRow modifier={modifier}/>
                            ))}
                        </TableBody>
                        {renderTableFooter()}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

interface RowProps {
    modifier: Modifier;
}

function ModifierRow(props: RowProps) {
    const {modifier} = props

    return (
        <TableRow key={modifier.type}>
            <TypographyCenterTableCell value={modifier.type}/>
            <TypographyCenterTableCell value={String(modifier.ranks)}/>
        </TableRow>
    )
}