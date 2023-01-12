import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Fragment, useEffect, useState } from 'react';
import * as React from 'react';
import {Gear} from "../../../models/equipment/Gear";
import EquipmentService from "../../../services/EquipmentService";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";
import Typography from "@mui/material/Typography";
import ActionsTableCell from "../../common/table/ActionsTableCell";

function Row(props: { row: Gear }): JSX.Element {
    const {row} = props
    const [open, setOpen] = useState(false)

    const renderPrice = (): JSX.Element => {
        let price = ''
        if (row.restricted) {
            price = row.price + '(R)'
        }
        else {
            price = String(row.price)
        }
        return (
            <Fragment>
                <Typography>{price}</Typography>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>{row.encumbrance}</TableCell>
                <TableCell>{renderPrice()}</TableCell>
                <TableCell>{row.rarity}</TableCell>
                <ActionsTableCell name={row.name} />
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <GenesysDescriptionTypography text={row.description}/>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default function ViewAllGear(): JSX.Element {
    const [gears, setGears] = useState<Gear[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const gearList = await EquipmentService.getGears()
            if (!gearList) {return}
            setGears(gearList)
        })()
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Encumbrance</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Rarity</TableCell>
                        <TableCell>View</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {gears.map((row: Gear) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
