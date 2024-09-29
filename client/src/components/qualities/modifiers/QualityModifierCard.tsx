import {Button, Card, CardContent, TableFooter, TextField} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {useLocation} from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import AddIcon from '@mui/icons-material/Add';
import {Fragment, useEffect, useState} from "react";
import * as React from "react";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import Quality from "../../../models/Quality";
import ModifierService from "../../../services/ModifierService";
import TableCell from "@mui/material/TableCell";
import {Autocomplete} from "@mui/lab";
import QualityService from "../../../services/QualityService";

interface Props {
    qual: Quality
}

export default function QualityModifierCard(props: Props) {
    const {qual} = props
    const pathname = useLocation().pathname
    const headers = ['Type', 'Ranks']
    const [quality, setQuality] = useState(qual);
    const [typeOptions, setTypeOptions] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            setTypeOptions(await ModifierService.getModifiers())
        })()
    }, [])

    const renderTableFooter = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <TableFooter>
                    <TableRow key={'footer'}>
                        <Button variant='contained' color='primary' onClick={addRow} startIcon={<AddIcon/>}>Add
                            Modifier</Button>
                    </TableRow>
                </TableFooter>
            )
        } else {
            return <Fragment/>
        }
    }

    const handleTypeChange = async (index: number, value: string) => {
        const updatedModifiers = quality.modifiers.map((row, i) =>
            i === index ? {...row, type: value} : row
        );
        setQuality(await QualityService.updateQuality({...quality, modifiers: updatedModifiers}));
    };

    const handleRanksChange = async (index: number, value: string) => {
        const updatedModifiers = quality.modifiers.map((row, i) =>
            i === index ? {...row, ranks: Number(value)} : row
        );
        setQuality(await QualityService.updateQuality({...quality, modifiers: updatedModifiers}));
    };

    const addRow = async () => {
        setQuality(await QualityService.updateQuality({
            ...quality,
            modifiers: [...quality.modifiers, {type: "Default", ranks: 1}]
        }));
    };

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Modifiers'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {quality.modifiers.map((modifiers, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Autocomplete
                                            options={typeOptions}
                                            getOptionLabel={(option) => option}
                                            value={modifiers.type}
                                            onChange={(e, newValue) => handleTypeChange(index, newValue as string)}
                                            renderInput={(params) => <TextField {...params} label="Type"
                                                                                variant="outlined"/>}
                                            disabled={pathname.endsWith('/view')}
                                        />
                                    </TableCell>
                                    <TableCell style={{textAlign: "center"}}>
                                        <TextField
                                            type="number"
                                            value={modifiers.ranks}
                                            onChange={(e) => handleRanksChange(index, e.target.value)}
                                            inputProps={{min: 1, max: 10}}
                                            disabled={pathname.endsWith('/view')}
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
    );
}