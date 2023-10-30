import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {renderHeaders} from "../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import Talent from "../../../../models/Talent";
import * as React from "react";
import Minion from "../../../../models/actor/npc/Minion";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TypographyCenterTableCell
} from "../../../common/table/TypographyTableCell";

interface TableProps {
    minion: Minion
}

export default function MinionTalentTable(props: TableProps) {
    const {minion} = props
    const headers = ['Name', 'Summary']

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <GenesysDescriptionTypographyCenterTableCell value={'Talents'} span={headers.length}/>
                    </TableRow>
                    <TableRow>
                        {renderHeaders(headers)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(minion?.talents!! || []).map((row: Talent) => (
                        <TalentRow key={row.name} talent={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

interface Props {
    talent: Talent
    skillRanks?: number
}

function TalentRow(props: Props): JSX.Element {
    const {talent} = props

    return (
        <TableRow>
            <TypographyCenterTableCell value={talent.name}/>
            <GenesysDescriptionTypographyCenterTableCell value={talent.summary}/>
        </TableRow>
    )
}