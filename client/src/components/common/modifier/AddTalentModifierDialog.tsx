import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Modifier, {getModifierOptions, Type} from "../../../models/Modifier";
import {useState} from "react";
import Talent from "../../../models/Talent";
import TalentService from "../../../services/TalentService";
import InputSelectFieldCard from "../InlineSelectFieldCard";
import NumberRangeSelectCard from "../NumberRangeSelectCard";

interface Props {
    talent: Talent
    open: boolean
    onClose: () => void
}

export default function AddTalentModifierDialog(props: Props) {
    const {talent, open, onClose} = props
    const [modifier, setModifier] = useState<Modifier>()

    const handleAdd = async (): Promise<void> => {
        if (modifier) {
            if (!talent.modifiers.some(mod => mod.type === modifier.type)) {
                talent.modifiers.push(modifier)
                await TalentService.updateTalent(talent.name, talent)
            }
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