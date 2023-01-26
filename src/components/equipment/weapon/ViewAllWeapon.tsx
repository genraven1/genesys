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
import Typography from "@mui/material/Typography";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import {EquipmentPath} from "../../../services/Path";

function Row(props: { row: Weapon }): JSX.Element {
    const {row} = props
    const [open, setOpen] = useState(false)

    const renderDamage = (): JSX.Element => {
        let damage = ''
        if (row.brawn) {
            damage = 'Brawn + ' + row.damage
        }
        else {
            damage = String(row.damage)
        }
        return (
            <Typography>{damage}</Typography>
        )
    }

    const renderPrice = (): JSX.Element => {
        let price = ''
        if (row.restricted) {
            price = row.price + '(R)'
        }
        else {
            price = String(row.price)
        }
        return (
            <Typography>{price}</Typography>
        )
    }

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TableCell style={{textAlign:'left'}}>{row.name}</TableCell>
                <TableCell style={{textAlign:'center'}}>{row.skill.name}</TableCell>
                <TableCell style={{textAlign:'center'}}>{renderDamage()}</TableCell>
                <TableCell style={{textAlign:'center'}}>{row.critical}</TableCell>
                <TableCell style={{textAlign:'center'}}>{row.range}</TableCell>
                <TableCell style={{textAlign:'center'}}>{row.encumbrance}</TableCell>
                <TableCell style={{textAlign:'center'}}>{renderPrice()}</TableCell>
                <TableCell style={{textAlign:'center'}}>{row.rarity}</TableCell>
                <ActionsTableCell name={row.name} path={EquipmentPath.Weapon}/>
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

export default function ViewAllWeapon(): JSX.Element {
    const [weapons, setWeapons] = useState<Weapon[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const weaponList = await EquipmentService.getWeapons()
            if (!weaponList) {return}
            setWeapons(weaponList)
        })()
    }, [setWeapons])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{textAlign:'left'}}>Name</TableCell>
                        <TableCell style={{textAlign:'center'}}>Skill</TableCell>
                        <TableCell style={{textAlign:'center'}}>Damage</TableCell>
                        <TableCell style={{textAlign:'center'}}>Critical</TableCell>
                        <TableCell style={{textAlign:'center'}}>Range</TableCell>
                        <TableCell style={{textAlign:'center'}}>Encumbrance</TableCell>
                        <TableCell style={{textAlign:'center'}}>Price</TableCell>
                        <TableCell style={{textAlign:'center'}}>Rarity</TableCell>
                        <TableCell style={{textAlign:'center'}}>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {weapons.map((row: Weapon) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
