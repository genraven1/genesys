import Table from "@mui/material/Table";
import {renderDoubleRowTableHeader} from "../../common/table/TableRenders";
import * as React from "react";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import Player from "../../../models/actor/player/Player";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import {ActorPath} from "../../../services/RootPath";

interface Props {
    headers: string[]
    players: Player[]
}

export default function PartyPlayerTable(props: Props) {
    const {headers, players} = props;

    const renderPlayerTableBody = () => {
        if (players === undefined || players.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return (
            <TableBody>
                {players.map((player: Player) => (
                    <TableRow key={player.name}>
                        <TypographyCenterTableCell value={player.name}/>
                        <ActionsTableCell name={player.name} path={ActorPath.Player}/>
                    </TableRow>
                ))}
            </TableBody>
        )
    }

    return (
        <Table>
            {renderDoubleRowTableHeader(headers, 'Players')}
            {renderPlayerTableBody()}
        </Table>
    )
}