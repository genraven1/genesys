import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react';
import * as React from 'react';
import Actor, {ActorType} from "../../../models/actor/Actor";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import ActorService from "../../../services/ActorService";
import {ActorPath} from "../../../services/RootPath";
import {Card, CardContent, CardHeader} from "@mui/material";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import {useFetchCurrentCampaign} from "../CampaignWorkflow";

interface Props {
    actor: Actor
}

function Row(props: Props) {
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
            <ActionsTableCell name={actor.name} path={getPathFromType()}/>
        </TableRow>
    )
}

export default function ViewAllActors() {
    const [actors, setActors] = useState<Actor[]>([]);
    const headers = ['Name', 'Type', 'View'];
    const campaign = useFetchCurrentCampaign();

    useEffect(() => {
        (async (): Promise<void> => {
            if (!campaign) return;
            setActors(await ActorService.getActors(campaign.id))
        })()
    }, [setActors])

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={'View All Actors'}></CardHeader>
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