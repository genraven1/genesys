import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import GenesysTalentTypography from "../../../../common/typography/GenesysTalentTypography";
import Player from "../../../../../models/actor/player/Player";
import {ActorTalent} from "../../../../../models/Talent";
import {renderDoubleRowTableHeader} from "../../../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell";

interface Props {
    talent: ActorTalent
    skillRanks?: number
}

function Row(props: Props): JSX.Element {
    const {talent, skillRanks} = props;

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
    player: Player
}

export default function PlayerTalentTable(props: TableProps) {
    const {player} = props;
    const headers = ['Name', 'Summary']

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderDoubleRowTableHeader(headers, 'Talents', 1)}
                <TableBody>
                    {(player.talents || []).map((talent: ActorTalent) => (
                        <Row key={talent.name} talent={talent}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}