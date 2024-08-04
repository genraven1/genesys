import TableCell from "@mui/material/TableCell";
import InputNumberRangeSelectField from "../InputNumberRangeSelect";
import {EquipmentQuality} from "../../../models/Quality";

interface Props {
    equipmentQuality: EquipmentQuality
    onEquipmentQualityChange: (equipmentQuality: EquipmentQuality) => void
}

export default function EquipmentQualityRankTableCell(props: Props) {
    const {equipmentQuality, onEquipmentQualityChange} = props

    const handleEdit = async (ranks: number): Promise<void> => {
        equipmentQuality.ranks = ranks
        onEquipmentQualityChange(equipmentQuality)
    }

    return (
        <TableCell>
            <InputNumberRangeSelectField defaultValue={equipmentQuality.ranks} min={0} max={15} onCommit={handleEdit} />
        </TableCell>
    )
}