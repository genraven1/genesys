import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import QualityService from "../../../services/QualityService";
import Quality, {EquipmentQuality} from "../../../models/Quality";
import QualityBackdrop from "../QualityBackdrop";
import {Weapon} from "../../../models/equipment/Weapon";
import EquipmentService from "../../../services/EquipmentService";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import EquipmentQualityRankTableCell from "../../common/table/EquipmentQualityRankTableCell";

interface RowProps {
    quality: EquipmentQuality
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
            <EquipmentQualityRankTableCell equipmentQuality={quality} onEquipmentQualityChange={addQuality}/>
        </TableRow>
    )
}

interface TableProps {
    weapon: Weapon
}

export default function WeaponQualitySelectionTable(props: TableProps) {
    const {weapon} = props
    const [qualities, setQualities] = useState<EquipmentQuality[]>([])
    const headers = ['Name', 'Add']

    useEffect(() => {
        (async (): Promise<void> => {
            let qualities = await QualityService.getQualities() as Quality[]
            let equipmentQualities = [] as EquipmentQuality[]
            for (let quality of qualities) {
                equipmentQualities.concat({...quality, ranks: 0})
            }
            setQualities(equipmentQualities)
        })()
    }, [setQualities])

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {qualities.map((quality: EquipmentQuality) => (
                        <QualityRow quality={quality} weapon={weapon}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}