import {Card, CardContent, Divider, Grid} from '@mui/material';
import * as React from "react";
import {Weapon} from "../../../models/equipment/Weapon";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import {renderHeaders} from '../../common/table/TableRenders';

interface Props {
    weapon: Weapon
}

export default function WeaponViewShort(props: Props) {
    const {weapon} = props
    const headers = ['Name', 'Skill', 'Damage', 'Critical', 'Range', 'Price', 'Special Qualities']

    const renderDamage = (): string => {
        let damage = ''
        if (weapon?.brawn!!) {
            damage = 'Brawn + ' + weapon?.damage!!
        } else {
            damage = String(weapon?.damage!!)
        }
        return damage
    }

    const renderPrice = (): string => {
        let price = ''
        if (weapon?.restricted!!) {
            price = weapon?.price!! + '(R)'
        } else {
            price = String(weapon?.price!!)
        }
        return price
    }

    const renderQualities = (): string => {
        let qualities = ''
        if (weapon?.qualities!!.length > 0) {
            for (const quality of weapon.qualities.sort((a, b) => a.name.localeCompare(b.name))) {
                qualities = qualities.concat(quality.name + ' ' + quality.ranks + ' ')
            }
        } else {
            qualities = 'None'
        }
        return qualities
    }

    return (
        <Card>
            <CenteredCardHeader title={weapon.name}/>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={weapon.description}/>
                    </Grid>
                    <Divider/>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                {renderHeaders(headers)}
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TypographyCenterTableCell value={weapon.name}/>
                                    <TypographyCenterTableCell value={weapon?.skill?.name!!}/>
                                    <TypographyCenterTableCell value={renderDamage()}/>
                                    <TypographyCenterTableCell value={String(weapon?.critical!!)}/>
                                    <TypographyCenterTableCell value={weapon?.range!!}/>
                                    <TypographyCenterTableCell value={renderPrice()}/>
                                    <TypographyCenterTableCell value={renderQualities()}/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </CardContent>
        </Card>
    )
}
