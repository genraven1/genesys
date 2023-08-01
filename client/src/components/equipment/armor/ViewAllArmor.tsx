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
import {Armor} from "../../../models/equipment/Armor";
import EquipmentService from "../../../services/EquipmentService";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import {EquipmentPath} from "../../../services/Path";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import { renderHeaders } from '../../common/table/TableRenders';
import {renderPrice, renderSoak} from '../../../models/equipment/EquipmentHelper';

interface Props {
    row: Armor
    columns: number
}

function Row(props: Props): JSX.Element {
    const { row, columns } = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={row.name}/>
                <TypographyCenterTableCell value={String(row.defense)}/>
                <TypographyCenterTableCell value={renderSoak(row)}/>
                <TypographyCenterTableCell value={String(row.encumbrance)}/>
                <TypographyCenterTableCell value={renderPrice(row)}/>
                <TypographyCenterTableCell value={String(row.rarity)}/>
                <ActionsTableCell name={row.name} path={EquipmentPath.Armor}/>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <GenesysDescriptionTypography text={row?.description!!}/>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default function ViewAllArmor() {
    const [armors, setArmors] = useState<Armor[]>([])
    const headers = ['Name', 'Defense', 'Soak', 'Encumbrance', 'Price', 'Rarity', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            const armorList = await EquipmentService.getArmors()
            if (!armorList) { return }
            setArmors(armorList)
        })()
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    {renderHeaders(headers)}
                </TableHead>
                <TableBody>
                    {armors.map((row: Armor) => (
                        <Row key={row.name} row={row} columns={headers.length}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
