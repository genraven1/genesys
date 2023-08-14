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
    weapon: Weapon
    columns: number
}

function Row(props: Props): JSX.Element {
    const {weapon, columns} = props
    const [open, setOpen] = useState(false)

    const renderDamage = (): string => {
        let damage = ''
        if (weapon.brawn) {damage = 'Brawn + ' + weapon.damage}
        else {damage = String(weapon.damage)}
        return damage
    }

    const renderPrice = (): string => {
        let price = ''
        if (weapon.restricted) {price = weapon.price + '(R)'}
        else {price = String(weapon.price)}
        return price
    }

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={weapon.name}/>
                <TypographyCenterTableCell value={weapon.skill.name}/>
                <TypographyCenterTableCell value={renderDamage()}/>
                <TypographyCenterTableCell value={String(weapon.critical)}/>
                <TypographyCenterTableCell value={weapon.range}/>
                <TypographyCenterTableCell value={String(weapon.encumbrance)}/>
                <TypographyCenterTableCell value={renderPrice()}/>
                <TypographyCenterTableCell value={String(weapon.rarity)}/>
                <ActionsTableCell id={String(weapon.id)} path={EquipmentPath.Weapon}/>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <GenesysDescriptionTypography text={weapon.description}/>
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
                        <Row key={row.name} weapon={row} columns={headers.length}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
