import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react';
import * as React from 'react';
import Actor, {ActorType} from "../../models/actor/Actor";
import ActionsTableCell from "../common/table/ActionsTableCell";
import ActorService from "../../services/ActorService";
import {ActorPath} from "../../services/Path";
import {Card, CardContent, CardHeader} from "@mui/material";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";

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
            <ActionsTableCell id={actor.name} path={getPathFromType()}/>
        </TableRow>
    )
}

export default function ViewAllActors() {
    const [actors, setActors] = useState<Actor[]>([])
    const headers = ['Name', 'Type', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            const actorList = await ActorService.getActors()
            if (!actorList) {
                return
            }
            setActors(actorList)
        })()
    }, [setActors])

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={'View All Actors'}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {actors.map((actor: Actor) => (
                                <Row key={actor.name} actor={actor}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}