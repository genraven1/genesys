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

interface Props {
    actor: Actor
}

function Row(props: Props): JSX.Element {
    const {actor} = props

    const getPathFromType = (): string => {
        switch (actor.type) {
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
            <TableCell>{actor.name}</TableCell>
            <TableCell>{actor.type}</TableCell>
            <ActionsTableCell id={String(actor.id)} path={getPathFromType()}/>
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
                    {actors.map((actor: Actor) => (
                        <Row key={actor.name} actor={actor} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}