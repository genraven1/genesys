import {Autocomplete, Button, Card, CardContent, TableFooter, TextField} from "@mui/material";
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import {Weapon} from "../../../../models/equipment/Weapon";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import {useLocation} from "react-router-dom";
import {EquipmentQuality} from "../../../../models/Quality";
import QualityService from "../../../../services/QualityService";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import EquipmentService from "../../../../services/EquipmentService";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

interface Props {
    weap: Weapon
}

export default function WeaponQualityCard(props: Props) {
    const {weap} = props;
    const pathname = useLocation().pathname;
    const [weapon, setWeapon] = useState(weap);
    const [equipmentQualities, setEquipmentQualities] = useState<EquipmentQuality[]>([]);
    const headers = ['Quality', 'Ranks'];


    useEffect(() => {
        (async () => {
            let qualities = await QualityService.getQualities();
            let updatedQualities = qualities.map((quality) => ({
                ...quality,
                ranks: 1,
            } as EquipmentQuality));
            setEquipmentQualities(updatedQualities);
        })()
    }, [])

    const renderTableFooter = () => {
        if (pathname.endsWith(weapon.id + '/edit')) {
            return (
                <TableFooter>
                    <TableRow key={'footer'}>
                        <Button variant='contained' color='primary' onClick={addRow} startIcon={<AddIcon/>}>Add
                            Quality</Button>
                    </TableRow>
                </TableFooter>
            )
        } else {
            return <Fragment/>
        }
    }

    const addRow = async () => {
        setWeapon({...weapon, qualities: [...weapon.qualities, {} as EquipmentQuality]});
    };

    const handleQualityChange = async (index: number, value: EquipmentQuality) => {
        const updatedQualities = weapon.qualities.map((row, i) =>
            i === index ? {...value} : row
        );
        setWeapon(await EquipmentService.updateWeapon({...weapon, qualities: updatedQualities}));
    };

    const handleRanksChange = async (index: number, value: string) => {
        const updatedQualities = weapon.qualities.map((row, i) =>
            i === index ? {...row, ranks: Number(value)} : row
        );
        setWeapon(await EquipmentService.updateWeapon({...weapon, qualities: updatedQualities}));
    };

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Equipment Qualities'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {weapon.qualities.map((quality, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Autocomplete
                                            options={equipmentQualities}
                                            getOptionLabel={(option) => option.name}
                                            value={quality}
                                            onChange={(e, newValue) => handleQualityChange(index, newValue as EquipmentQuality)}
                                            renderInput={(params) => <TextField {...params} label="Quality"
                                                                                variant="outlined"/>}
                                            disabled={!pathname.endsWith(weapon.id + '/edit')}
                                        />
                                    </TableCell>
                                    <TableCell style={{textAlign: "center"}}>
                                        <TextField
                                            type="number"
                                            value={quality.ranks}
                                            label="Ranks"
                                            onChange={(e) => handleRanksChange(index, e.target.value)}
                                            inputProps={{min: 1, max: 10}}
                                            disabled={!pathname.endsWith(weapon.id + '/edit')}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {renderTableFooter()}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}