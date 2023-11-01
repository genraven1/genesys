import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {ActorArmor} from "../../../../../models/equipment/Armor";
import Actor, {ActorType} from "../../../../../models/actor/Actor";
import ActorService from "../../../../../services/ActorService";
import {InputTextFieldCard} from "../../../../common/InputTextFieldCard";
import NumberRangeSelectCard from "../../../../common/NumberRangeSelectCard";

interface Props {
    actor: Actor
    open: boolean
    onClose: () => void
}

export default function CreateArmorDialog(props: Props) {
    const {actor, open, onClose} = props
    const [armor, setArmor] = useState<ActorArmor>()

    const onCreate = async (): Promise<void> => {
        switch (actor.type) {
            case ActorType.Minion:
                await ActorService.createMinionArmor(actor.id, armor!!)
                break
            case ActorType.Rival:
                await ActorService.createRivalArmor(actor.id, armor!!)
                break
            case ActorType.Nemesis:
                await ActorService.createNemesisArmor(actor.name, armor!!)
                break
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
            <DialogTitle>
                Add Custom Armor
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={10}>
                    <InputTextFieldCard defaultValue={armor?.name!!} onCommit={(value: string): void => { onChange('name', value) }} title={'Name'} helperText={'Name'} placeholder={'Name'} />
                </Grid>
                <Divider />
                <Grid container spacing={10}>
                    <NumberRangeSelectCard title={'Soak'} defaultValue={armor?.soak!!} onChange={(value: number): void => {onChange('soak', String(value))}} min={0} max={5} />
                    <NumberRangeSelectCard title={'Defense'} defaultValue={armor?.defense!!} onChange={(value: number): void => {onChange('defense', String(value))}} min={0} max={4} />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={onCreate}>CREATE</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}