import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Fragment, useEffect, useState} from 'react';
import * as React from 'react';
import NonPlayerCharacter, {combat, general, social} from "../../../models/actor/npc/NonPlayerCharacter";
import {ActorType} from "../../../models/actor/Actor";
import {ActorPath} from "../../../services/Path";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import ActorService from "../../../services/ActorService";
import {renderHeaders} from "../../common/table/TableRenders";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TypographyCenterTableCell
} from "../../common/table/TypographyTableCell";
import Collapse from "@mui/material/Collapse";

interface RowProps {
    npc: NonPlayerCharacter
    columns: number
}

function Row(props: RowProps): JSX.Element {
    const {npc, columns} = props
    const [open, setOpen] = useState(false)

    const getPathFromType = (): string => {
        switch (npc.type) {
            case ActorType.Minion:
                return ActorPath.Minion
            case ActorType.Rival:
                return ActorPath.Rival
            case ActorType.Nemesis:
                return ActorPath.Nemesis
            case ActorType.Player:
                return ''
        }
    }

    return (
        <Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}} onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={npc.name}/>
                <TypographyCenterTableCell value={npc.type}/>
                <ActionsTableCell id={String(npc.id)} path={getPathFromType()}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <GenesysDescriptionTypographyCenterTableCell value={combat + ' ' + String(npc.combat)}/>
                                    <GenesysDescriptionTypographyCenterTableCell value={social + ' ' + String(npc.social)}/>
                                    <GenesysDescriptionTypographyCenterTableCell value={general + ' ' + String(npc.general)}/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default function ViewAllNonPlayerCharacters() {
    const [nonPlayerCharacters, setNonPlayerCharacters] = useState<NonPlayerCharacter[]>([])
    const headers = ['Name', 'Type', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            const actorList = await ActorService.getNonPlayerCharacters()
            if (!actorList) {
                return
            }
            setNonPlayerCharacters(actorList)
        })()
    }, [setNonPlayerCharacters])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    {renderHeaders(headers)}
                </TableHead>
                <TableBody>
                    {nonPlayerCharacters.map((npc: NonPlayerCharacter) => (
                        <Row key={npc.name} npc={npc} columns={headers.length}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}