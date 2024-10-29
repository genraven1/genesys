import {Autocomplete, Button, Card, CardContent, TableFooter, TextField} from "@mui/material";
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import {EquipmentQuality} from "../../../../models/Quality";
import QualityService from "../../../../services/QualityService";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import {Armor} from "../../../../models/equipment/Armor";

interface Props {
    armor: Armor
    updateArmor: (armor: Armor) => void
    disabled: boolean
}

export default function ArmorQualityCard(props: Props) {
    const {armor, updateArmor, disabled} = props;
    const [equipmentQualities, setEquipmentQualities] = useState<EquipmentQuality[]>([]);
    const headers = ['Quality', 'Ranks'];

    useEffect(() => {
        (async () => {
            let qualities = await QualityService.getQualities();
            let updatedQualities = qualities.filter((quality) => quality.armor).map((quality) => ({
                ...quality,
                ranks: 1,
            } as EquipmentQuality));
            setEquipmentQualities(updatedQualities);
        })()
    }, [])

    const renderTableFooter = () => {
        if (!disabled) {
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
        updateArmor({...armor, qualities: [...armor.qualities, {} as EquipmentQuality]});
    };

    const handleQualityChange = async (index: number, value: EquipmentQuality) => {
        const updatedQualities = armor.qualities.map((row, i) =>
            i === index ? {...value} : row
        );
        updateArmor({...armor, qualities: updatedQualities});
    };

    const handleRanksChange = async (index: number, value: string) => {
        const updatedQualities = armor.qualities.map((row, i) =>
            i === index ? {...row, ranks: Number(value)} : row
        );
        updateArmor({...armor, qualities: updatedQualities});
    };

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Equipment Qualities'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {armor.qualities.map((quality, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Autocomplete
                                            options={equipmentQualities}
                                            getOptionLabel={(option) => option.name}
                                            value={quality}
                                            onChange={(e, newValue) => handleQualityChange(index, newValue as EquipmentQuality)}
                                            renderInput={(params) => <TextField {...params} label="Quality"
                                                                                variant="outlined"/>}
                                            disabled={disabled}
                                        />
                                    </TableCell>
                                    <TableCell style={{textAlign: "center"}}>
                                        <TextField
                                            type="number"
                                            value={quality.ranks}
                                            label="Ranks"
                                            onChange={(e) => handleRanksChange(index, e.target.value)}
                                            inputProps={{min: 1, max: 10}}
                                            disabled={disabled}
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