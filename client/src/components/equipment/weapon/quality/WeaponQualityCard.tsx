import {Card, CardContent} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {Weapon} from "../../../../models/equipment/Weapon";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import {useLocation} from "react-router-dom";
import {EquipmentQuality} from "../../../../models/Quality";
import TableRow from "@mui/material/TableRow";
import EquipmentService from "../../../../services/EquipmentService";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import NumberTextFieldIndexTableCell from "../../../common/table/NumberTextFieldIndexTableCell";
import QualityAutocompleteTableCell from "../../../common/table/QualityAutocompleteTableCell";
import QualityTableFooter from "../../../common/table/QualityTableFooter";

interface Props {
    weap: Weapon
}

export default function WeaponQualityCard(props: Props) {
    const {weap} = props;
    const pathname = useLocation().pathname;
    const [weapon, setWeapon] = useState(weap);
    const headers = ['Quality', 'Ranks'];

    const addRow = async () => {
        setWeapon({...weapon, qualities: [...weapon.qualities, {} as EquipmentQuality]});
    };

    const handleQualityChange = async (index: number, value: EquipmentQuality) => {
        const updatedQualities = weapon.qualities.map((row, i) =>
            i === index ? {...value} : row
        );
        setWeapon(await EquipmentService.updateWeapon({...weapon, qualities: updatedQualities}));
    };

    const handleRanksChange = async (index: number, value: number) => {
        const updatedQualities = weapon.qualities.map((row, i) =>
            i === index ? {...row, ranks: value} : row
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
                                    <QualityAutocompleteTableCell disabled={!pathname.endsWith(weapon.id + '/edit')}
                                                                  onChange={handleQualityChange} quality={quality}
                                                                  index={index}/>
                                    <NumberTextFieldIndexTableCell title={'Ranks'} value={quality.ranks}
                                                                   onChange={handleRanksChange} min={1} max={10}
                                                                   disabled={!pathname.endsWith(weapon.id + '/edit')}
                                                                   index={index}/>
                                </TableRow>
                            ))}
                        </TableBody>
                        <QualityTableFooter id={weapon.id} addRow={addRow}/>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}