import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {Armor} from "../../../models/equipment/Armor";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import {EquipmentPath} from "../../../services/Path";
import Setting from "../../../models/Setting";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {renderHeaders} from "../../common/table/TableRenders";
import {renderPrice, renderSoak} from "../../../models/equipment/EquipmentHelper";
import ViewSettingsCard from "../../common/setting/ViewSettingsCard";

interface Props {
    armor: Armor
    settings: Setting[]
}

export default function ArmorView(props: Props) {
    const {armor, settings} = props
    const {name} = useParams<{ name: string }>()
    let navigate = useNavigate()
    const headers = ['Name', 'Defense', 'Soak', 'Encumbrance', 'Price', 'Rarity']

    const onEdit = () => {
        navigate(EquipmentPath.Armor + name + '/edit');
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={armor?.name!!}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={armor?.description!!}/>
                    </Grid>
                    <Divider/>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                {renderHeaders(headers)}
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TypographyCenterTableCell value={armor?.name!!}/>
                                    <TypographyCenterTableCell value={String(armor?.defense!!)}/>
                                    <TypographyCenterTableCell value={renderSoak(armor)}/>
                                    <TypographyCenterTableCell value={String(armor?.encumbrance!!)}/>
                                    <TypographyCenterTableCell value={renderPrice(armor)}/>
                                    <TypographyCenterTableCell value={String(armor?.rarity!!)}/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Divider/>
                <ViewSettingsCard settings={armor?.settings!!} allSettings={settings}/>
            </CardContent>
        </Card>
    )
}
