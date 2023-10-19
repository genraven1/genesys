import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import {Fragment, useEffect, useState} from 'react';
import {Armor} from "../../../models/equipment/Armor";
import EquipmentService from "../../../services/EquipmentService";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import {EquipmentPath} from "../../../services/Path";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import {renderHeaders} from '../../common/table/TableRenders';
import {renderPrice, renderSoak} from '../../../models/equipment/EquipmentHelper';
import {Button, Card, CardContent, CardHeader, Divider} from "@mui/material";
import CreateEquipmentDialog from "../CreateEquipmentDialog";
import {EquipmentType} from "../../../models/equipment/Equipment";

interface Props {
    armor: Armor
    columns: number
}

function Row(props: Props): JSX.Element {
    const {armor, columns} = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}} onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={armor.name}/>
                <TypographyCenterTableCell value={String(armor.defense)}/>
                <TypographyCenterTableCell value={renderSoak(armor)}/>
                <TypographyCenterTableCell value={String(armor.encumbrance)}/>
                <TypographyCenterTableCell value={renderPrice(armor)}/>
                <TypographyCenterTableCell value={String(armor.rarity)}/>
                <ActionsTableCell id={String(armor.id)} path={EquipmentPath.Armor}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <GenesysDescriptionTypography text={armor?.description!!}/>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default function ViewAllArmor() {
    const [armors, setArmors] = useState<Armor[]>([])
    const [openEquipmentCreationDialog, setOpenEquipmentCreationDialog] = useState(false)
    const headers = ['Name', 'Defense', 'Soak', 'Encumbrance', 'Price', 'Rarity', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            const armorList = await EquipmentService.getArmors()
            if (!armorList) {
                return
            }
            setArmors(armorList)
        })()
    }, [])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Armors'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenEquipmentCreationDialog(true)}>Create Armor</Button>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            {renderHeaders(headers)}
                        </TableHead>
                        <TableBody>
                            {armors.map((armor: Armor) => (
                                <Row key={armor.name} armor={armor} columns={headers.length}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openEquipmentCreationDialog && <CreateEquipmentDialog open={openEquipmentCreationDialog}
                                                                   onClose={(): void => setOpenEquipmentCreationDialog(false)}
                                                                   type={EquipmentType.Armor}/>}
        </Card>
    )
}
