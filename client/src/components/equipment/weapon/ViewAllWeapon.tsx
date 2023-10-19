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
import {renderHeaders} from "../../common/table/TableRenders";
import {renderDamage, renderPrice} from "../../../models/equipment/EquipmentHelper";
import {Button, Card, CardContent, CardHeader, Divider} from "@mui/material";
import CreateEquipmentDialog from "../CreateEquipmentDialog";
import {EquipmentType} from "../../../models/equipment/Equipment";

interface Props {
    weapon: Weapon
    columns: number
}

function Row(props: Props): JSX.Element {
    const {weapon, columns} = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={weapon.name}/>
                <TypographyCenterTableCell value={weapon.skill.name}/>
                <TypographyCenterTableCell value={renderDamage(weapon)}/>
                <TypographyCenterTableCell value={String(weapon.critical)}/>
                <TypographyCenterTableCell value={weapon.range}/>
                <TypographyCenterTableCell value={String(weapon.encumbrance)}/>
                <TypographyCenterTableCell value={renderPrice(weapon)}/>
                <TypographyCenterTableCell value={String(weapon.rarity)}/>
                <ActionsTableCell id={String(weapon.id)} path={EquipmentPath.Weapon}/>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small">
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
    const [openEquipmentCreationDialog, setOpenEquipmentCreationDialog] = useState(false)
    const headers = ['Name', 'Skill', 'Damage', 'Critical', 'Range', 'Encumbrance', 'Price', 'Rarity', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            const weaponList = await EquipmentService.getWeapons()
            if (!weaponList) {return}
            setWeapons(weaponList)
        })()
    }, [setWeapons])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Weapons'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenEquipmentCreationDialog(true)}>Create Weapon</Button>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            {renderHeaders(headers)}
                        </TableHead>
                        <TableBody>
                            {weapons.map((weapon: Weapon) => (
                                <Row key={weapon?.name!!} weapon={weapon!!} columns={headers.length}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openEquipmentCreationDialog && <CreateEquipmentDialog open={openEquipmentCreationDialog}
                                                                   onClose={(): void => setOpenEquipmentCreationDialog(false)}
                                                                   type={EquipmentType.Weapon}/>}
        </Card>
    )
}
