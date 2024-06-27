import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {ActorTalent} from "../../../../../models/Talent";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell";
import GenesysTalentTypography from "../../../../common/typography/GenesysTalentTypography";
import Rival from "../../../../../models/actor/npc/Rival";
import {renderDoubleRowTableHeader} from "../../../../common/table/TableRenders";

interface Props {
    talent: ActorTalent
    skillRanks?: number
}

function Row(props: Props): JSX.Element {
    const {talent, skillRanks} = props

    return (
        <TableRow>
            <TypographyCenterTableCell value={talent.name}/>
            <TableCell>
                <GenesysTalentTypography text={talent.summary} ranks={talent.ranks} secondRanks={skillRanks}/>
            </TableCell>
        </TableRow>
    );
}

interface TableProps {
    rival: Rival
}

export default function RivalTalentTable(props: TableProps) {
    const {rival} = props
    const headers = ['Name', 'Summary']

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderDoubleRowTableHeader(headers, 'Talents')}
                <TableBody>
                    {(rival.talents || []).map((talent: ActorTalent) => (
                        <Row key={talent.name} talent={talent}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}