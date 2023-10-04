import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {Weapon} from "../../../models/equipment/Weapon";
import {EquipmentPath} from "../../../services/Path";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import Setting from "../../../models/Setting";
import ViewSettingsCard from "../../common/setting/ViewSettingsCard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "../../common/table/TypographyTableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {renderDamage, renderPrice, renderQualities,} from "../../../models/equipment/EquipmentHelper";
import {renderHeaders} from "../../common/table/TableRenders";

interface Props {
    weapon: Weapon
    settings: Setting[]
}

export default function WeaponView(props: Props) {
    const {weapon, settings} = props
    const {id} = useParams<{ id: string }>()
    let navigate = useNavigate()
    const headers = ['Name', 'Skill', 'Damage', 'Critical', 'Range', 'Price', 'Special Qualities']

    const onEdit = () => {
        navigate(EquipmentPath.Weapon + id + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={weapon?.name!!}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={weapon?.description!!}/>
                    </Grid>
                    <Divider/>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                {renderHeaders(headers)}
                            </TableHead>
                            <TableBody>
                                <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                    <TypographyLeftTableCell value={weapon?.name!!}/>
                                    <TypographyCenterTableCell value={weapon?.skill?.name!!}/>
                                    <TypographyCenterTableCell value={renderDamage(weapon)}/>
                                    <TypographyCenterTableCell value={String(weapon?.critical!!)}/>
                                    <TypographyCenterTableCell value={weapon?.range!!}/>
                                    <TypographyCenterTableCell value={renderPrice(weapon)}/>
                                    <TypographyCenterTableCell value={renderQualities(weapon!!)}/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Divider/>
                    <ViewSettingsCard settings={weapon?.settings!!} allSettings={settings}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
