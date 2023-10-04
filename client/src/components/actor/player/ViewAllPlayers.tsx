import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react';
import * as React from 'react';
import Player from '../../../models/actor/player/Player';
import ActorService from '../../../services/ActorService';
import ActionsTableCell from '../../common/table/ActionsTableCell';
import {ActorPath} from "../../../services/Path";
import {renderHeaders} from "../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";

interface Props {
    player: Player
}

function Row(props: Props): JSX.Element {
    const {player} = props


    return (
        <TableRow>
            <TypographyCenterTableCell value={player.name}/>
            <ActionsTableCell id={String(player.id)} path={ActorPath.Player}/>
        </TableRow>
    )
}

export default function ViewAllPlayers() {
    const [players, setPlayers] = useState<Player[]>([])
    const headers = ['Name', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            const playerList = await ActorService.getPlayers()
            if (!playerList) {
                return
            }
            setPlayers(playerList)
        })()
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    {renderHeaders(headers)}
                </TableHead>
                <TableBody>
                    {players.map((player: Player) => (
                        <Row key={player.name} player={player}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}