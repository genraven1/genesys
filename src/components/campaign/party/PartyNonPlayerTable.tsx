import Table from "@mui/material/Table";
import {renderDoubleRowTableHeader} from "../../common/table/TableRenders";
import * as React from "react";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import {ActorPath} from "../../../services/RootPath";
import NonPlayerActor from "../../../models/actor/npc/NonPlayerActor";

interface Props {
    headers: string[]
    npcs: NonPlayerActor[]
}

export default function PartyNonPlayerTable(props: Props) {
    const {headers, npcs} = props;

    const renderPlayerTableBody = () => {
        if (npcs === undefined || npcs.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return (
            <TableBody>
                {npcs.map((npc: NonPlayerActor) => (
                    <TableRow key={npc.name}>
                        <TypographyCenterTableCell value={npc.name}/>
                        <ActionsTableCell name={npc.name} path={ActorPath.Player}/>
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