import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
import {ActorTalent} from "../../../../../models/Talent";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TypographyCenterTableCell
} from "../../../../common/table/TypographyTableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import * as React from "react";
import TalentActivationTableCell from "../../../../common/table/TalentActivationTableCell";

interface Props {
    talents: ActorTalent[]
}

export default function PlayerTalentCard(props: Props) {
    const {talents} = props;
    const headers = ['Name', 'Activation', 'Summary', 'Activate'];

    const renderTableBody = () => {
        return (
            <TableBody>
                {(talents).map((talent: ActorTalent) => (
                    <TableRow>
                        <TypographyCenterTableCell value={talent.name}/>
                        <TypographyCenterTableCell value={talent.activation}/>
                        <GenesysDescriptionTypographyCenterTableCell value={talent.summary}/>
                        <TalentActivationTableCell talent={talent}/>
                    </TableRow>
                ))}
            </TableBody>
        )
    };

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Talents'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        {renderTableBody()}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}