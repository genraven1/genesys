import {Dialog, DialogContent, DialogTitle, Divider, Grid} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import ActorService from "../../../../../services/ActorService";
import {InputTextFieldCard} from "../../../../common/InputTextFieldCard";
import Ability from "../../../../../models/Ability";
import {Activation, getActivationOptions} from "../../../../../models/Talent";
import InputSelectFieldCard from "../../../../common/InlineSelectFieldCard";
import {GenesysDialogActions} from "../../../../common/dialog/GenesysDialogActions";
import Rival from "../../../../../models/actor/npc/Rival";

interface Props {
    rival: Rival
    open: boolean
    onClose: () => void
}

export default function CreateRivalAbilityDialog(props: Props) {
    const {rival, open, onClose} = props
    const [ability, setAbility] = useState<Ability>()

    const onCreate = async (): Promise<void> => {
        if (ability) {
            if (!rival.abilities.some(npcAbility => npcAbility.name === ability.name)) {
                rival.abilities.push(ability)
                await ActorService.updateRival(rival)
            }
        }
        onClose()
    }

    const onChange = async (key: keyof Ability, value: string) => {
        if (value === null) {
            return
        }
        const copyAbility = {...ability} as Ability
        switch (key) {
            case 'name':
                copyAbility.name = value
                break
            case "description":
                copyAbility.description = value
                break
            case "activation":
                copyAbility.activation = value as Activation
                break
            default:
                break
        }
        setAbility(copyAbility)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Custom Ability</DialogTitle>
            <DialogContent>
                <Grid container spacing={10}>
                    <InputTextFieldCard defaultValue={ability?.name!!} onCommit={(value: string): void => {
                        onChange('name', value)
                    }} title={'Name'} helperText={'Name'} placeholder={'Name'}/>
                </Grid>
                <Divider/>
                <Grid container spacing={10}>
                    <InputTextFieldCard defaultValue={ability?.description!!} onCommit={(value: string): void => {
                        onChange('description', value)
                    }} title={'Description'} helperText={'Description'} placeholder={'Description'}/>
                </Grid>
                <Grid container spacing={10}>
                    <InputSelectFieldCard defaultValue={ability?.activation!!} onCommit={(value: string): void => {
                        onChange('activation', value)
                    }} title={'Activation'} options={getActivationOptions()}/>
                </Grid>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    )
}