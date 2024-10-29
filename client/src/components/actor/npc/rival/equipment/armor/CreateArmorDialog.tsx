import {Dialog, DialogContent, DialogTitle, Divider, Grid, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {GenesysDialogActions} from "../../../../../common/dialog/GenesysDialogActions";
import {ActorArmor, ArmorSlot} from "../../../../../../models/equipment/Armor";
import {InputTextFieldCard} from "../../../../../common/InputTextFieldCard";
import NumberRangeSelectCard from "../../../../../common/NumberRangeSelectCard";
import {ViewFieldCard} from "../../../../../common/ViewFieldCard";
import {NumberTextFieldCard} from "../../../../../common/card/NumberTextField";
import {useLocation} from "react-router-dom";
import EquipmentService from "../../../../../../services/EquipmentService";
import SoakCard from "../../../../../common/card/SoakCard";
import DefenseCard from "../../../../../common/card/DefenseCard";

interface Props {
    open: boolean
    onCreateArmor: (armor: ActorArmor) => void
    onClose: () => void
}

export default function CreateArmorDialog(props: Props) {
    const {open, onCreateArmor, onClose} = props;
    const [armor, setArmor] = useState<ActorArmor>({
        slot: ArmorSlot.None,
        id: 'custom',
        modifiers: [],
        soak: 0,
        defense: 0,
        name: 'Default',
        price: 0,
        rarity: 0,
        restricted: false,
        encumbrance: 0,
        description: '',
        qualities: []
    });
    let pathname = useLocation().pathname

    const onCreate = async (): Promise<void> => {
        onCreateArmor({...armor, slot: ArmorSlot.None} as ActorArmor)
        onClose()
    }

    const handleSoakChange = async (value: number) => {
        setArmor({...armor, soak: value});
    };

    const handleDefenseChange = async (value: number) => {
        setArmor({...armor, defense: value});
    };

    const handleNameChange = async (value: string) => {
        setArmor({...armor, name: value});
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Custom Armor</DialogTitle>
            <DialogContent>
                <Grid container>
                    <TextField
                        value={armor.name}
                        variant="outlined"
                        fullWidth
                        label={'Name'}
                        onChange={e => handleNameChange(e.target.value)}
                    />
                </Grid>
                <Divider/>
                <Grid container>
                    <SoakCard armor={armor} updateSoak={handleSoakChange}/>
                    <DefenseCard armor={armor} updateDefense={handleDefenseChange}/>
                </Grid>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    )
}