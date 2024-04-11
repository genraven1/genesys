import {Button, Card, CardContent, TableFooter} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {useLocation} from "react-router-dom";
import Modifier from "../../../models/common/Modifier";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import AddIcon from '@mui/icons-material/Add';
import {Fragment, useState} from "react";
import * as React from "react";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import Quality from "../../../models/Quality";
import AddQualityModifierDialog from "./AddQualityModifierDialog";

interface Props {
    quality: Quality
}

export default function QualityModifierCard(props: Props) {
    const {quality} = props
    const [openDialog, setOpenDialog] = useState(false)
    const pathname = useLocation().pathname
    const headers = ['Type', 'Ranks']

    const renderTableFooter = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <TableFooter>
                    <TableRow>
                        <Button variant='contained' color='primary' onClick={addRow} startIcon={<AddIcon/>}>Add
                            Modifier</Button>
                        {openDialog && <AddQualityModifierDialog open={openDialog}
                                                                 onClose={(): void => setOpenDialog(false)}
                                                                 quality={quality}/>}
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
                            {(quality.modifiers).map((modifier) => (
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