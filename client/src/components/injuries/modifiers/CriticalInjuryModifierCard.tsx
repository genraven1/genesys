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
import Injury from "../../../models/Injury";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import ModifierService from "../../../services/ModifierService";
import InjuryService from "../../../services/InjuryService";
import TableCell from "@mui/material/TableCell";
import {Autocomplete} from "@mui/lab";

interface Props {
    crit: Injury
}

export default function CriticalInjuryModifierCard(props: Props) {
    const {crit} = props
    const pathname = useLocation().pathname
    const headers = ['Type', 'Ranks']
    const [injury, setInjury] = useState(crit);
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
                    <TableRow key={'Footer'}>
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
        const updatedModifiers = injury.modifiers.map((row, i) =>
            i === index ? {...row, type: value} : row
        );
        setInjury(await InjuryService.updateInjury({...injury, modifiers: updatedModifiers}));
    };

    const handleRanksChange = async (index: number, value: string) => {
        const updatedModifiers = injury.modifiers.map((row, i) =>
            i === index ? {...row, ranks: Number(value)} : row
        );
        setInjury(await InjuryService.updateInjury({...injury, modifiers: updatedModifiers}));
    };

    const addRow = async () => {
        setInjury(await InjuryService.updateInjury({
            ...injury,
            modifiers: [...injury.modifiers, {type: "Default", ranks: 1}]
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
                            {injury.modifiers.map((modifier, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Autocomplete
                                            options={typeOptions}
                                            getOptionLabel={(option) => option}
                                            value={modifier.type}
                                            onChange={(e, newValue) => handleTypeChange(index, newValue as string)}
                                            renderInput={(params) => <TextField {...params} label="Type"
                                                                                variant="outlined"/>}
                                            disabled={pathname.endsWith('/view')}
                                        />
                                    </TableCell>
                                    <TableCell style={{textAlign: "center"}}>
                                        <TextField
                                            type="number"
                                            value={modifier.ranks}
                                            label="Ranks"
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
    )
}