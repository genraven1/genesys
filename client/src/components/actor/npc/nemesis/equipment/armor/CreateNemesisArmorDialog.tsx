import {Dialog, DialogContent, DialogTitle, Divider, Grid} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Nemesis from "../../../../../../models/actor/npc/Nemesis";
import {GenesysDialogActions} from "../../../../../common/dialog/GenesysDialogActions";
import {ActorArmor, ArmorSlot} from "../../../../../../models/equipment/Armor";
import {InputTextFieldCard} from "../../../../../common/InputTextFieldCard";
import NumberRangeSelectCard from "../../../../../common/NumberRangeSelectCard";
import ActorService from "../../../../../../services/ActorService";

interface Props {
    nemesis: Nemesis
    open: boolean
    onClose: () => void
}

export default function CreateNemesisArmorDialog(props: Props) {
    const {nemesis, open, onClose} = props
    const [armor, setArmor] = useState<ActorArmor>()

    const onCreate = async (): Promise<void> => {
        if (armor) {
            nemesis.armors.push({...armor, slot: ArmorSlot.None})
            await ActorService.updateNemesis(nemesis.name, nemesis)
        }
        onClose()
    }

    const onChange = async (key: keyof ActorArmor, value: string) => {
        if (value === null) {
            return
        }
        const copyArmor = {...armor} as ActorArmor
        switch (key) {
            case 'name':
                copyArmor.name = value
                break
            case "soak":
                copyArmor.soak = Number(value)
                break
            case "defense":
                copyArmor.defense = Number(value)
                break
            default:
                break
        }
        setArmor(copyArmor)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Custom Armor</DialogTitle>
            <DialogContent>
                <Grid container spacing={10}>
                    <InputTextFieldCard defaultValue={armor?.name!!} onCommit={(value: string): void => {
                        onChange('name', value)
                    }} title={'Name'} helperText={'Name'} placeholder={'Name'}/>
                </Grid>
                <Divider/>
                <Grid container spacing={10}>
                    <NumberRangeSelectCard title={'Soak'} defaultValue={armor?.soak!!}
                                           onChange={(value: number): void => {
                                               onChange('soak', String(value))
                                           }} min={0} max={5}/>
                    <NumberRangeSelectCard title={'Defense'} defaultValue={armor?.defense!!}
                                           onChange={(value: number): void => {
                                               onChange('defense', String(value))
                                           }} min={0} max={4}/>
                </Grid>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    )
}