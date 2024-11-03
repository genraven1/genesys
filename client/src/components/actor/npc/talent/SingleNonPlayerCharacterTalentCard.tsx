import {Button, Card, CardContent, TableFooter} from "@mui/material";
import {Fragment, useState} from "react";
import {useLocation} from "react-router-dom";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import RivalTalentSelectionDialog from "./SingleNonPlayerCharacterTalentSelectionDialog";
import TableRow from "@mui/material/TableRow";
import Talent, {ActorTalent} from "../../../../models/Talent";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TypographyCenterTableCell
} from "../../../common/table/TypographyTableCell";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";

interface Props {
    talents: ActorTalent[]
    updateTalents: (talents: ActorTalent[]) => void
}

export default function SingleNonPlayerCharacterTalentCard(props: Props) {
    const {talents, updateTalents} = props;
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false);
    const headers = ['Name', 'Activation', 'Summary'];
    const pathname = useLocation().pathname;

    const addTalent = (talent: Talent) => {
        updateTalents([...talents, {...talent, ranks: 1}]);
    };

    const renderTableBody = () => {
        return (
            <TableBody>
                {(talents).map((talent: ActorTalent) => (
                    <TableRow>
                        <TypographyCenterTableCell value={talent.name}/>
                        <TypographyCenterTableCell value={talent.activation}/>
                        <GenesysDescriptionTypographyCenterTableCell value={talent.summary}/>
                    </TableRow>
                ))}
            </TableBody>
        )
    };

    const renderTableFooter = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <TableFooter>
                    <TableRow>
                        <Button color='primary' variant='contained'
                                onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                        {openSelectTalentDialog &&
                            <RivalTalentSelectionDialog open={openSelectTalentDialog}
                                                        onClose={(): void => setOpenSelectTalentDialog(false)}
                                                        addTalent={addTalent}/>}
                    </TableRow>
                </TableFooter>
            )
        } else {
            return <Fragment/>
        }
    };

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Talents'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        {renderTableBody()}
                        {renderTableFooter()}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}