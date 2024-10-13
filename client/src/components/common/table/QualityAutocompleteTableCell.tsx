import {Autocomplete} from "@mui/lab";
import {TextField} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import {useEffect, useState} from "react";
import Quality, {EquipmentQuality} from "../../../models/Quality";
import QualityService from "../../../services/QualityService";

interface Props {
    disabled: boolean
    onChange: (index: number, newValue: EquipmentQuality) => void
    quality: EquipmentQuality
    index: number
}

export default function QualityAutocompleteTableCell(props: Props) {
    const {disabled, onChange, quality, index} = props;
    const [equipmentQualities, setEquipmentQualities] = useState<Quality[]>([]);

    useEffect(() => {
        (async () => {
            let qualities = await QualityService.getQualities();
            let updatedQualities = qualities.filter((quality) => quality.weapon).map((quality) => ({
                ...quality,
                ranks: 1,
            } as EquipmentQuality));
            setEquipmentQualities(updatedQualities);
        })()
    }, [])

    return (
        <TableCell sx={{"width": .75}}>
            <Autocomplete
                options={equipmentQualities}
                getOptionLabel={(option) => option.name}
                value={quality}
                onChange={(e, newValue) => onChange(index, newValue as EquipmentQuality)}
                renderInput={(params) => <TextField {...params} label="Quality"
                                                    variant="outlined"/>}
                disabled={disabled}
            />
        </TableCell>
    )
}