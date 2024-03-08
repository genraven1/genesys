import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import GenesysTalentTypography from "../../../../common/typography/GenesysTalentTypography";
import {renderDoubleRowTableHeader} from "../../../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell";
import Minion, {GroupTalent} from "../../../../../models/actor/npc/Minion";
import GenesysDescriptionTypography from "../../../../common/typography/GenesysDescriptionTypography";

interface Props {
    talent: GroupTalent
    skillRanks?: number
}

function Row(props: Props): JSX.Element {
    const {talent, skillRanks} = props

    return (
        <TableRow>
            <TypographyCenterTableCell value={talent.name}/>
            <TableCell>
                <GenesysDescriptionTypography text={talent.summary}/>
            </TableCell>
        </TableRow>
    );
}

interface TableProps {
    minion: Minion
}

export default function MinionTalentTable(props: TableProps) {
    const {minion} = props
    const headers = ['Name', 'Summary']

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderDoubleRowTableHeader(headers, 'Talents', headers.length)}
                <TableBody>
                    {(minion.talents || []).map((talent: GroupTalent) => (
                        <Row key={talent.name} talent={talent}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}