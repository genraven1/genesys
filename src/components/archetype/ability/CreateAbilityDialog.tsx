import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Ability from "../../../models/Ability";
import ArchetypeService from "../../../services/ArchetypeService";
import Archetype from "../../../models/actor/player/Archetype";
import {Activation, getActivationOptions} from "../../../models/common/Activation";
import {InputTextFieldCard} from "../../common/InputTextFieldCard";
import InputSelectFieldCard from "../../common/InlineSelectFieldCard";

interface Props {
    archetype: Archetype
    open: boolean
    onClose: () => void
}

export default function CreateAbilityDialog(props: Props) {
    const {archetype, open, onClose} = props
    const [ability, setAbility] = useState<Ability>()

    const onCreate = async (): Promise<void> => {
        await ArchetypeService.createArchetypeAbility(archetype.name, ability!!)
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
            <DialogTitle>
                Add Custom Ability
            </DialogTitle>
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
            <DialogActions>
                <Button color='primary' variant='contained' onClick={onCreate}>CREATE</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}