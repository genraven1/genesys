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
import {Weapon} from "../../../models/equipment/Weapon";
import EquipmentService from "../../../services/EquipmentService";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import {EquipmentPath} from "../../../services/Path";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";

interface Props {
    row: Weapon
    columns: number
}

function Row(props: Props): JSX.Element {
    const {row, columns} = props
    const [open, setOpen] = useState(false)

    const renderDamage = (): string => {
        let damage = ''
        if (row.brawn) {damage = 'Brawn + ' + row.damage}
        else {damage = String(row.damage)}
        return damage
    }

    const renderPrice = (): string => {
        let price = ''
        if (row.restricted) {price = row.price + '(R)'}
        else {price = String(row.price)}
        return price
    }

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={row.name}/>
                <TypographyCenterTableCell value={row.skill.name}/>
                <TypographyCenterTableCell value={renderDamage()}/>
                <TypographyCenterTableCell value={String(row.critical)}/>
                <TypographyCenterTableCell value={row.range}/>
                <TypographyCenterTableCell value={String(row.encumbrance)}/>
                <TypographyCenterTableCell value={renderPrice()}/>
                <TypographyCenterTableCell value={String(row.rarity)}/>
                <ActionsTableCell name={row.name} path={EquipmentPath.Weapon}/>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns}>
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

export default function ViewAllWeapon(): JSX.Element {
    const [weapons, setWeapons] = useState<Weapon[]>([])
    const headers = ['Name', 'Skill', 'Damage', 'Critical', 'Range', 'Encumbrance', 'Price', 'Rarity', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            const weaponList = await EquipmentService.getWeapons()
            if (!weaponList) {return}
            setWeapons(weaponList)
        })()
    }, [setWeapons])

    const renderHeaders = (): JSX.Element => {
        return (
            <TableRow>
                {headers.map((header: string) => (
                    <TypographyCenterTableCell value={header}/>
                ))}
            </TableRow>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    {renderHeaders()}
                </TableHead>
                <TableBody>
                    {weapons.map((row: Weapon) => (
                        <Row key={row.name} row={row} columns={headers.length}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
