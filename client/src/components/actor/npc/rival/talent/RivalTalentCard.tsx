import {Button, Card, CardContent, TableFooter} from "@mui/material";
import RivalTalentTable from "./RivalTalentTable";
import {Fragment, useState} from "react";
import {useLocation} from "react-router-dom";
import Rival from "../../../../../models/actor/npc/Rival";
import GenesysDescriptionTypography from "../../../../common/typography/GenesysDescriptionTypography";
import CenteredCardHeader from "../../../../common/card/CenteredCardHeader";
import RivalTalentSelectionDialog from "./RivalTalentSelectionDialog";
import TableRow from "@mui/material/TableRow";
import {ActorTalent} from "../../../../../models/Talent";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";

interface Props {
    talents: ActorTalent[]
    updateTalents: (talents: ActorTalent[]) => void
}

export default function RivalTalentCard(props: Props) {
    const {talents, updateTalents} = props;
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false);
    const headers = ['Name', 'Summary'];
    const pathname = useLocation().pathname;

    const renderTableBody = () => {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {(talents).map((talent: ActorTalent) => (
                            <TableRow>
                                <TypographyCenterTableCell value={talent.name}/>
                                <TypographyCenterTableCell value={talent.summary}/>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    const renderTableFooter = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <TableFooter>
                    <TableRow>
                        <Button color='primary' variant='contained'
                                onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                        {openSelectTalentDialog &&
                            <RivalTalentSelectionDialog open={openSelectTalentDialog}
                                                        onClose={(): void => setOpenSelectTalentDialog(false)} addTalent={}/>}
                    </TableRow>
                </TableFooter>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Talents'}/>
            <CardContent>
                {renderSingleRowTableHeader(headers)}
                {renderTableBody()}
                {renderTableFooter()}
            </CardContent>
        </Card>
    )
}