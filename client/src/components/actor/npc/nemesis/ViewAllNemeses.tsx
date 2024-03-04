import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Fragment, useEffect, useState} from 'react';
import * as React from 'react';
import Nemesis from "../../../../models/actor/npc/Nemesis";
import ActorService from '../../../../services/ActorService'
import ActionsTableCell from "../../../common/table/ActionsTableCell";
import {ActorPath} from "../../../../services/Path";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import {Card, CardContent, CardHeader} from "@mui/material";

interface Props {
    nemesis: Nemesis
}

function Row(props: Props): JSX.Element {
    const {nemesis} = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}} onClick={() => setOpen(!open)}>
                <TableCell>{nemesis.name}</TableCell>
                <ActionsTableCell id={nemesis.name} path={ActorPath.Nemesis}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table>
                                <TableBody>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default function ViewAllNemeses() {
    const [nemeses, setNemeses] = useState<Nemesis[]>([])
    const headers = ['Name', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            const nemesisList = await ActorService.getNemeses()
            if (!nemesisList) {
                return
            }
            setNemeses(nemesisList)
        })()
    }, [])

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={'View All Nemeses'}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {nemeses.map((nemesis: Nemesis) => (
                                <Row key={nemesis.name} nemesis={nemesis}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}