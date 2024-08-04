import {Card, CardContent, Divider, Grid} from '@mui/material';
import * as React from "react";
import {Weapon} from "../../../models/equipment/Weapon";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import {renderSingleRowTableHeader} from '../../common/table/TableRenders';
import {renderDamage, renderPrice, renderQualities} from "../../../models/equipment/EquipmentHelper";

interface Props {
    weapon: Weapon
}

export default function WeaponViewShort(props: Props) {
    const {weapon} = props
    const headers = ['Name', 'Skill', 'Damage', 'Critical', 'Range', 'Price', 'Special Qualities']

    return (
        <Card>
            <CenteredCardHeader title={weapon.name}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={weapon.description}/>
                    </Grid>
                    <Divider/>
                    <TableContainer component={Paper}>
                        <Table>
                            {renderSingleRowTableHeader(headers)}
                            <TableBody>
                                <TableRow>
                                    <TypographyCenterTableCell value={weapon.name}/>
                                    <TypographyCenterTableCell value={weapon.skill.name}/>
                                    <TypographyCenterTableCell value={renderDamage(weapon)}/>
                                    <TypographyCenterTableCell value={String(weapon.critical)}/>
                                    <TypographyCenterTableCell value={weapon.range}/>
                                    <TypographyCenterTableCell value={renderPrice(weapon)}/>
                                    <TypographyCenterTableCell value={renderQualities(weapon.qualities)}/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </CardContent>
        </Card>
    )
}
