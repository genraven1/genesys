import {useEffect, useState} from "react";
import Modifier, {Type} from "../../../models/common/Modifier";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import InputSelectFieldCard from "../../common/InlineSelectFieldCard";
import NumberRangeSelectCard from "../../common/NumberRangeSelectCard";
import Quality from "../../../models/Quality";
import QualityService from "../../../services/QualityService";
import ModifierService from "../../../services/ModifierService";
import {Option} from "../../common/InputSelectField";
import {GenesysDialogActions} from "../../common/dialog/GenesysDialogActions";

interface Props {
    quality: Quality
    open: boolean
    onClose: () => void
}

export default function AddQualityModifierDialog(props: Props) {
    const {quality, open, onClose} = props;
    const [modifiers, setModifiers] = useState<string[]>([]);
    const [modifier, setModifier] = useState<Modifier>();

    useEffect(() => {
        (async (): Promise<void> => {
            setModifiers(await ModifierService.getModifiers())
        })()
    }, [])

    const getModifierOptions = (): Option[] => {
        return Object.values(modifiers).map((value) => ({value}))
    }

    const handleAdd = async (): Promise<void> => {
        if (modifier) {
            if (!quality.modifiers.some(mod => mod.type === modifier.type)) {
                quality.modifiers.push(modifier)
                await QualityService.updateQuality(quality)
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
                    onChange('type', value);
                }} title={'Modifier Type'} options={getModifierOptions()}/>
                <NumberRangeSelectCard
                    defaultValue={modifier?.ranks!} title={'Modifier Ranks'}
                    onChange={(value: number): void => {
                        onChange('ranks', String(value));
                    }} min={1} max={6}/>
            </DialogContent>
            <GenesysDialogActions handleCreate={handleAdd} onClose={onClose}/>
        </Dialog>
    )
}