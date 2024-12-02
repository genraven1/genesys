import Rival from "../../../../models/actor/npc/Rival";
import {Button} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import SceneService from "../../../../services/SceneService";
import {useEffect, useState} from "react";

export default function EnemySceneRivals() {
    const [rivals, setRivals] = useState<Rival[]>([]);
    const headers = ['Name', 'Add'];

    useEffect(() => {
        (async (): Promise<void> => {
            setRivals(await SceneService.getEnemyRivalsForScene());
        })()
    }, [setRivals]);

    const addRival = async (rival: Rival) => {
        await SceneService.addRivalToScene(rival);
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {rivals.map((rival: Rival) => (
                        <TableRow key={rival.id}>
                            <TableCell>
                                <Button>{rival.name}</Button>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => addRival(rival)}>Add</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}