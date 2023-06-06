import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {Armor} from "../../../models/equipment/Armor";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import {EquipmentPath} from "../../../services/Path";
import Setting from "../../../models/Setting";
import {Fragment} from "react";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {renderHeaders} from "../../common/table/TableRenders";
import {renderPrice, renderSoak} from "../../../models/equipment/EquipmentHelper";

interface Props {
    armor: Armor
    allSettings: Setting[]
}

export default function ArmorView(props: Props) {
    const {armor, allSettings} = props
    const {name} = useParams<{ name: string }>()
    let navigate = useNavigate()
    const headers = ['Name', 'Defense', 'Soak', 'Encumbrance', 'Price', 'Rarity']

    const onEdit = () => {
        navigate(EquipmentPath.Armor + name + '/edit');
    }

    const renderSettings = (): JSX.Element => {
        if (armor?.settings!! === undefined) {
            return <Fragment/>
        }
        let settingList = []
        for (let setting of allSettings) {
            if (armor?.settings.includes(setting.name)) {
                settingList.push(setting)
            }
        }
        return (
            <Fragment>
                {(settingList || []).map((setting: Setting): JSX.Element => {
                    return <GenesysDescriptionTypography text={setting?.name!!}/>
                })}
            </Fragment>
        )
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
                <Grid container spacing={10}>
                    <Grid item xs>
                        <Card>
                            <CardHeader title={'Settings'} style={{textAlign: 'center'}}/>
                            <Divider/>
                            <CardContent>
                                {renderSettings()}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
