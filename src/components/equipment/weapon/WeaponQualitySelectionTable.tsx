import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import QualityService from "../../../services/QualityService";
import Quality from "../../../models/Quality";
import QualityBackdrop from "../QualityBackdrop";
import {Weapon} from "../../../models/equipment/Weapon";
import EquipmentService from "../../../services/EquipmentService";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";

interface RowProps {
    quality: Quality
    weapon: Weapon
}

function QualityRow(props: RowProps) {
    const {quality, weapon} = props;
    const [openQualityBackDrop, setOpenQualityBackDrop] = useState(false)

    const addQuality = async () => {
        if (weapon.qualities.find(equipmentQuality => equipmentQuality.name === quality.name)) {
            for (const equipmentQuality1 of weapon.qualities) {
                const index = weapon.qualities.indexOf(equipmentQuality1);
                if (equipmentQuality1.name === quality.name) {
                    equipmentQuality1.ranks = equipmentQuality1.ranks + 1
                    await EquipmentService.updateWeaponQuality(String(weapon.weapon_id), equipmentQuality1)
                    weapon.qualities[index] = equipmentQuality1
                }
            }
        } else {
            weapon.qualities = weapon.qualities.concat({...quality, ranks: 1})
        }
        let equipmentQuality = await EquipmentService.addWeaponQuality(String(weapon.weapon_id), {...quality, ranks: 1})
        weapon.qualities = weapon.qualities.concat(equipmentQuality)
    }

    return (
        <TableRow>
            <TableCell>
                <Button onClick={(): void => setOpenQualityBackDrop(true)}>{quality.name}</Button>
                {openQualityBackDrop &&
                    <QualityBackdrop open={openQualityBackDrop} onClose={(): void => setOpenQualityBackDrop(false)}
                                     quality={quality}/>}
            </TableCell>
            <TableCell>
                <Button onClick={addQuality}>Add</Button>
            </TableCell>
        </TableRow>
    )
}

interface TableProps {
    weapon: Weapon
}

export default function WeaponQualitySelectionTable(props: TableProps) {
    const {weapon} = props
    const [qualities, setQualities] = useState<Quality[]>([])
    const headers = ['Name', 'Add']

    useEffect(() => {
        (async (): Promise<void> => {
            setQualities(await QualityService.getQualities())
        })()
    }, [setQualities])

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {qualities.map((quality: Quality) => (
                        <QualityRow quality={quality} weapon={weapon}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}