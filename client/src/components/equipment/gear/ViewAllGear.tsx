import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Fragment, useEffect, useState} from 'react';
import * as React from 'react';
import {Gear} from "../../../models/equipment/Gear";
import EquipmentService from "../../../services/EquipmentService";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";
import Typography from "@mui/material/Typography";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import {EquipmentPath} from "../../../services/Path";

interface Props {
    gear: Gear
}

function Row(props: Props): JSX.Element {
    const {gear} = props
    const [open, setOpen] = useState(false)

    const renderPrice = (): JSX.Element => {
        let price = ''
        if (gear.restricted) {
            price = gear.price + '(R)'
        } else {
            price = String(gear.price)
        }
        return (
            <Fragment>
                <Typography>{price}</Typography>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}} onClick={() => setOpen(!open)}>
                <TableCell component="th" scope="row">{gear.name}</TableCell>
                <TableCell>{gear.encumbrance}</TableCell>
                <TableCell>{renderPrice()}</TableCell>
                <TableCell>{gear.rarity}</TableCell>
                <ActionsTableCell id={String(gear.id)} path={EquipmentPath.Gear}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <GenesysDescriptionTypography text={gear.description}/>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default function ViewAllGear(): JSX.Element {
    const [gears, setGears] = useState<Gear[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const gearList = await EquipmentService.getGears()
            if (!gearList) {
                return
            }
            setGears(gearList)
        })()
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Encumbrance</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Rarity</TableCell>
                        <TableCell>View</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {gears.map((gear: Gear) => (
                        <Row key={gear.name} gear={gear}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
