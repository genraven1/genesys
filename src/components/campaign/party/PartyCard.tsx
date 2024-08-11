import Party from "../../../models/campaign/Party";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import Player from "../../../models/actor/player/Player";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import {ActorPath} from "../../../services/RootPath";
import Table from "@mui/material/Table";
import {renderDoubleRowTableHeader} from "../../common/table/TableRenders";
import NonPlayerActor from "../../../models/actor/npc/NonPlayerActor";

interface Props {
    party: Party
}

export default function PartyCard(props: Props) {
    const {party} = props;
    const headers = ['Name', 'View']

    const renderPlayerTableBody = () => {
        if (party.players === undefined || party.players.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return (
            <TableBody>
                {party.players.map((player: Player) => (
                    <TableRow key={player.name}>
                        <TypographyCenterTableCell value={player.name}/>
                        <ActionsTableCell name={player.name} path={ActorPath.Player}/>
                    </TableRow>
                ))}
            </TableBody>
        )
    }

    const renderNonPlayerTableBody = () => {
        if (party.npcs === undefined || party.npcs.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return (
            <TableBody>
                {party.npcs.map((npc: NonPlayerActor) => (
                    <TableRow key={npc.name}>
                        <TypographyCenterTableCell value={npc.name}/>
                        <ActionsTableCell name={npc.name} path={ActorPath.Player}/>
                    </TableRow>
                ))}
            </TableBody>
        )
    }

    return (
        <Card sx={{"width": 1}}>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Party'}
                action={<Button color='primary' variant='contained'>Import Player</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderDoubleRowTableHeader(headers, 'Players')}
                        {renderPlayerTableBody()}
                    </Table>
                    <Table>
                        {renderDoubleRowTableHeader(headers, 'Players')}
                        {renderNonPlayerTableBody()}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}