import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Actor, {ActorType} from "../../models/actor/Actor";
import ActionsTableCell from "../common/table/ActionsTableCell";
import ActorService from "../../services/ActorService";
import {ActorPath} from "../../services/Path";

function Row(props: { row: Actor }): JSX.Element {
    const {row} = props

    const getPathFromType = (): string => {
        switch (row.type) {
            case ActorType.Minion:
                return ActorPath.Minion
            case ActorType.Rival:
                return ActorPath.Rival
            case ActorType.Nemesis:
                return ActorPath.Nemesis
            case ActorType.Player:
                return ActorPath.Player
        }
    }

    return (
        <TableRow>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.type}</TableCell>
            <ActionsTableCell name={row.name} path={getPathFromType()}/>
        </TableRow>
    )
}

export default function ViewAllActors() {
    const [actors, setActors] = useState<Actor[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const actorList = await ActorService.getActors()
            if (!actorList) { return }
            setActors(actorList)
        })()
    }, [setActors])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {actors.map((row: Actor) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}