import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import {useEffect, useState} from 'react';
import Player from '../../../models/actor/player/Player';
import ActorService from '../../../services/ActorService';
import ActionsTableCell from '../../common/table/ActionsTableCell';
import {ActorPath} from "../../../services/Path";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import CreateActorDialog from "../npc/CreateActorDialog";
import {ActorType} from "../../../models/actor/Actor";

interface Props {
    player: Player
}

function Row(props: Props): JSX.Element {
    const {player} = props


    return (
        <TableRow key={player.name}>
            <TypographyCenterTableCell value={player.name}/>
            <ActionsTableCell id={player.name} path={ActorPath.Player}/>
        </TableRow>
    )
}

export default function ViewAllPlayers() {
    const [players, setPlayers] = useState<Player[]>([])
    const [openActorCreationDialog, setOpenActorCreationDialog] = useState(false)
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
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Actors'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenActorCreationDialog(true)}>Create Actor</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {players.map((player: Player) => (
                                <Row key={player.name} player={player}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openActorCreationDialog && <CreateActorDialog open={openActorCreationDialog}
                                                           onClose={(): void => setOpenActorCreationDialog(false)}
                                                           actorType={ActorType.Player}/>}
        </Card>
    )
}