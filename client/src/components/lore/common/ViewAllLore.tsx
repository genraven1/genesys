import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {useEffect, useState} from "react";
import LoreService from "../../../services/LoreService";
import Lore, {LoreType} from "../../../models/lore/Lore";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import {LorePath} from "../../../services/Path";

interface RowProps {
    lore: Lore
}

function LoreRow(props: RowProps): JSX.Element {
    const {lore} = props

    const getLorePath = ():LorePath => {
        switch (lore.type) {
            case LoreType.ORGANIZATION:
                return LorePath.Organization
        }
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">{lore.name}</TableCell>
            <TableCell>{lore.type}</TableCell>
            <ActionsTableCell name={lore.name} path={getLorePath()}/>
        </TableRow>
    )
}

export function ViewAllLore(): JSX.Element {
    const [lore, setLore] = useState<Lore[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const loreList = await LoreService.getAllLore()
            if (!loreList) { return }
            setLore(loreList)
        })()
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={3} style={{textAlign: "center"}}>Lore</TableCell>
                    </TableRow>
                </TableHead>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lore.map((lore: Lore) => (
                        <LoreRow lore={lore}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
