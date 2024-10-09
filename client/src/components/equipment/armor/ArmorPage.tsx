import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {Armor} from "../../../models/equipment/Armor";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import {EquipmentPath} from "../../../services/Path";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import {renderPrice, renderQualities, renderSoak} from "../../../models/equipment/EquipmentHelper";
import {Fragment, useEffect, useState} from "react";
import {Weapon} from "../../../models/equipment/Weapon";
import EquipmentService from "../../../services/EquipmentService";
import CheckIcon from "@mui/icons-material/Check";
import ArmorModifierCard from "./modifier/ArmorModifierCard";
import ArmorQualityCard from './quality/ArmorQualityCard';

export default function ArmorPage() {
    const {id} = useParams<{ id: string }>();
    const [armor, setArmor] = useState<Armor | null>(null);
    let pathname = useLocation().pathname;
    let navigate = useNavigate();
    const headers = ['Name', 'Defense', 'Soak', 'Encumbrance', 'Price', 'Rarity', 'Qualities']

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setArmor(await EquipmentService.getArmor(id));
        })()
    }, [id, setArmor])

    if (!armor) {
        return <Fragment/>;
    }

    const onPageChange = () => {
        if (pathname.endsWith('/view')) {
            return (
                <IconButton title='Edit' size='small'
                            onClick={(): void => navigate(EquipmentPath.Armor + id + '/edit')}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        } else {
            return (
                <IconButton title='View' size='small'
                            onClick={(): void => navigate(EquipmentPath.Armor + id + '/view')}>
                    <CheckIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        }
    }

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={armor.name} action={onPageChange()}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={armor?.description!!}/>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table>
                            {renderSingleRowTableHeader(headers)}
                            <TableBody>
                                <TableRow>
                                    <TypographyCenterTableCell value={armor?.name!!}/>
                                    <TypographyCenterTableCell value={String(armor?.defense!!)}/>
                                    <TypographyCenterTableCell value={renderSoak(armor)}/>
                                    <TypographyCenterTableCell value={String(armor?.encumbrance!!)}/>
                                    <TypographyCenterTableCell value={renderPrice(armor)}/>
                                    <TypographyCenterTableCell value={String(armor?.rarity!!)}/>
                                    <TypographyCenterTableCell value={renderQualities(armor)}/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ArmorQualityCard arm={armor}/>
                    <ArmorModifierCard arm={armor}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
