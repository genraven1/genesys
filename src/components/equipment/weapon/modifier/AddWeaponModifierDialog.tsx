import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";
import EquipmentService from "../../../../services/EquipmentService";
import Modifier, {getModifierOptions, Type} from "../../../../models/common/Modifier";
import InputSelectFieldCard from "../../../common/InlineSelectFieldCard";
import NumberRangeSelectCard from "../../../common/NumberRangeSelectCard";
import {Weapon} from "../../../../models/equipment/Weapon";

interface Props {
    weapon: Weapon
    open: boolean
    onClose: () => void
}

export default function AddWeaponModifierDialog(props: Props) {
    const {weapon, open, onClose} = props
    const [modifier, setModifier] = useState<Modifier>()

    const handleAdd = async (): Promise<void> => {
        if (modifier) {
            await EquipmentService.addArmorModification(String(weapon.weapon_id), modifier)
        }
        onClose()
    }

    const onChange = async (key: keyof Modifier, value: string) => {
        if (value === null) {
            return
        }
        const copyModifier = {...modifier} as Modifier
        switch (key) {
            case "type":
                copyModifier.type = value as Type
                break;
            case "ranks":
                copyModifier.ranks = Number(value)
                break;
            default:
                break
        }
        setModifier(copyModifier)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Modifier'}/>
            <DialogContent>
                <InputSelectFieldCard defaultValue={modifier?.type!} onCommit={(value: string): void => {
                    onChange('type', value)
                }} title={'Modifier Type'} options={getModifierOptions()}/>
                <NumberRangeSelectCard defaultValue={modifier?.ranks!} title={'Modifier Ranks'} onChange={(value: number): void => {
                    onChange('ranks', String(value))
                }} min={1} max={6}/>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={handleAdd}>ADD</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}