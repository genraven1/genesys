import {Card, CardContent, CardHeader} from "@mui/material";
import {ActorWeapon} from "../../models/equipment/Weapon";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {Fragment, useState} from "react";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "../common/table/TypographyTableCell";

interface Props {
    weapons: ActorWeapon[]
}

export default function ViewActorWeaponCard(props: Props): JSX.Element {
    const {weapons} = props

    const renderTableBody = () => {
        if(!weapons) {return}
        else {
            return weapons.map((row: ActorWeapon) => (
                <Row key={row.name} row={row} />
            ))
        }
    }

    return(
        <Card>
            <CardHeader title={'Weapons'} style={{ textAlign: 'center' }}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TypographyLeftTableCell value={'Name'}/>
                                <TypographyCenterTableCell value={'Equipped'}/>
                                <TypographyCenterTableCell value={'Skill'}/>
                                <TypographyCenterTableCell value={'Damage'}/>
                                <TypographyCenterTableCell value={'Critical'}/>
                                <TypographyCenterTableCell value={'Range'}/>
                                <TypographyCenterTableCell value={'Encumbrance'}/>
                                <TypographyCenterTableCell value={'Slot'}/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderTableBody()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

function Row(props: { row: ActorWeapon }): JSX.Element {
    const {row} = props
    const [open, setOpen] = useState(false)

    const renderDamage = (): string => {
        let damage = ''
        if (row.brawn) {damage = 'Brawn + ' + row.damage}
        else {damage = String(row.damage)}
        return damage
    }

    const renderEquipped = (): string => {
        let equip = ''
        if (row.equipped) {equip = 'True'}
        else {equip='False'}
        return equip
    }

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TypographyLeftTableCell value={row.name}/>
                <TypographyCenterTableCell value={renderEquipped()}/>
                <TypographyCenterTableCell value={row.skill.name}/>
                <TypographyCenterTableCell value={renderDamage()}/>
                <TypographyCenterTableCell value={String(row.critical)}/>
                <TypographyCenterTableCell value={row.range}/>
                <TypographyCenterTableCell value={String(row.encumbrance)}/>
                <TypographyCenterTableCell value={row.slot}/>
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