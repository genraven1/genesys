import {MenuItem, Select, TableCell} from "@mui/material";
import React from "react";
import {ActorArmor, ArmorSlot} from "../../../models/equipment/Armor";
import {useLocation} from "react-router-dom";

interface Props {
    armor: ActorArmor
    onChange: (armor: ActorArmor) => void
}

export function ArmorSlotTableCell(props: Props) {
    const {armor, onChange} = props;

    return (
        <TableCell style={{textAlign: 'center'}}>
            <Select
                value={armor.slot}
                onChange={(e) => onChange({...armor, slot: e.target.value as ArmorSlot})}
                disabled={!useLocation().pathname.endsWith('/edit')}
                fullWidth
                label={'Armor Slot'}
                variant={'standard'}>
                {Object.values(ArmorSlot).map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </TableCell>
    )
}