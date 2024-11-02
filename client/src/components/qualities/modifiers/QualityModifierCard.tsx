import {Card, CardContent} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {useLocation} from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {useState} from "react";
import * as React from "react";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import Quality from "../../../models/Quality";
import QualityService from "../../../services/QualityService";
import NumberTextFieldIndexTableCell from "../../common/table/NumberTextFieldIndexTableCell";
import ModifierAutocompleteTableCell from "../../common/table/ModifierAutocompleteTableCell";
import ModifierTableFooter from "../../common/table/ModifierTableFooter";

interface Props {
    qual: Quality
}

export default function QualityModifierCard(props: Props) {
    const {qual} = props;
    const headers = ['Type', 'Ranks'];
    const [quality, setQuality] = useState(qual);
    const disabled = !useLocation().pathname.endsWith(quality.id + '/edit');

    const handleTypeChange = async (index: number, value: string) => {
        const updatedModifiers = quality.modifiers.map((row, i) =>
            i === index ? {...row, type: value} : row
        );
        setQuality(await QualityService.updateQuality({...quality, modifiers: updatedModifiers}));
    };

    const handleRanksChange = async (index: number, value: number) => {
        const updatedModifiers = quality.modifiers.map((row, i) =>
            i === index ? {...row, ranks: value} : row
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
                            {quality.modifiers.map((modifier, index) => (
                                <TableRow key={index}>
                                    <ModifierAutocompleteTableCell disabled={disabled} onChange={handleTypeChange}
                                                                   type={modifier.type} index={index}/>
                                    <NumberTextFieldIndexTableCell title={'Ranks'} value={modifier.ranks}
                                                                   onChange={handleRanksChange} min={1} max={10}
                                                                   disabled={disabled} index={index}/>
                                </TableRow>
                            ))}
                        </TableBody>
                        <ModifierTableFooter id={quality.id} addRow={addRow}/>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}