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
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import {Armor} from "../../../models/equipment/Armor";
import EquipmentService from "../../../services/EquipmentService";

interface RowProps {
    quality: Quality
    armor: Armor
}

function QualityRow(props: RowProps) {
    const {quality, armor} = props;
    const [openQualityBackDrop, setOpenQualityBackDrop] = useState(false)

    const addQuality = async () => {
        if (armor.qualities.find(equipmentQuality => equipmentQuality.name === quality.name)) {
            for (const equipmentQuality of armor.qualities) {
                const index = armor.qualities.indexOf(equipmentQuality);
                if (equipmentQuality.name === quality.name) {
                    equipmentQuality.ranks = equipmentQuality.ranks + 1
                    await EquipmentService.updateArmorQuality(String(armor.armor_id), equipmentQuality)
                    armor.qualities[index] = equipmentQuality
                }
            }
        } else {
            let equipmentQuality = await EquipmentService.addArmorQuality(String(armor.armor_id), {...quality, ranks: 1})
            armor.qualities = armor.qualities.concat(equipmentQuality)
        }
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
    armor: Armor
}

export default function ArmorQualitySelectionTable(props: TableProps) {
    const {armor} = props
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
                        <QualityRow quality={quality} armor={armor}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}