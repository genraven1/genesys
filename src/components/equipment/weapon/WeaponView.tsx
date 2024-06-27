import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from "react";
import {useNavigate} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {Weapon} from "../../../models/equipment/Weapon";
import {EquipmentPath} from "../../../services/RootPath";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import ViewSettingsCard from "../../common/setting/ViewSettingsCard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {renderDamage, renderPrice, renderQualities,} from "../../../models/equipment/EquipmentHelper";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import SkillTableCell from "../../common/table/SkillTableCell";
import {useFetchAllSettings} from "../../setting/SettingWorkflow";

interface Props {
    weapon: Weapon
}

export default function WeaponView(props: Props) {
    const {weapon} = props
    let navigate = useNavigate()
    const headers = ['Name', 'Skill', 'Hands', 'Damage', 'Critical', 'Range', 'Price', 'Special Qualities']

    const onEdit = () => {
        navigate(EquipmentPath.Weapon + weapon.name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={weapon.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <Divider/>
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
                                <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                    <TypographyCenterTableCell value={weapon.name}/>
                                    <SkillTableCell skill={weapon.skill}/>
                                    <TypographyCenterTableCell value={String(weapon.hands)}/>
                                    <TypographyCenterTableCell value={renderDamage(weapon)}/>
                                    <TypographyCenterTableCell value={String(weapon.critical)}/>
                                    <TypographyCenterTableCell value={weapon.range}/>
                                    <TypographyCenterTableCell value={renderPrice(weapon)}/>
                                    <TypographyCenterTableCell value={renderQualities(weapon)}/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Divider/>
                    <ViewSettingsCard settings={weapon.settings} allSettings={useFetchAllSettings()}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
