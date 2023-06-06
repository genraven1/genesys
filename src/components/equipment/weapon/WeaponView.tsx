import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {Weapon} from "../../../models/equipment/Weapon";
import {EquipmentPath} from "../../../services/Path";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import Setting from "../../../models/Setting";
import ViewSettingsCard from "../../common/ViewSettingsCard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "../../common/table/TypographyTableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {renderDamage, renderPrice, renderWeaponQualities} from "../../../models/equipment/EquipmentHelper";
import {renderHeaders} from "../../common/table/TableRenders";

interface Props {
    weapon: Weapon
    allSettings: Setting[]
}

export default function WeaponView(props: Props) {
    const {weapon, allSettings} = props
    const {name} = useParams<{ name: string }>()
    let navigate = useNavigate()
    const headers = ['Name', 'Skill', 'Damage', 'Critical', 'Range', 'Special Qualities']

    const onEdit = () => {
        navigate(EquipmentPath.Weapon + name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={weapon?.name!!}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={weapon?.description!!} />
                    </Grid>
                    <Divider />
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
                                    <TypographyCenterTableCell value={renderWeaponQualities(weapon)}/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewSettingsCard settingIds={weapon?.settings!!} allSettings={allSettings} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
