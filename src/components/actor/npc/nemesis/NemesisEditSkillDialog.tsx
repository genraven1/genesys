import {useState} from "react";
import {Dialog, DialogActions, DialogContentText, DialogTitle} from "@mui/material";
import {NonPlayerCharacterSkill} from "../../../../models/actor/npc/NonPlayerCharacter";
import InputNumberRangeSelectField from "../../../common/InputNumberRangeSelect";
import ActorService from "../../../../services/ActorService";

interface Props {
    open: boolean
    name: string
    actorSkill: NonPlayerCharacterSkill
    onClose: () => void
}

export default function NemesisEditSkillDialog(props: Props) {
    const { open, actorSkill, name, onClose } = props;
    const [skill, setSkill] = useState<NonPlayerCharacterSkill>(actorSkill);

    const handleEdit = async (ranks: number): Promise<void> => {
        const copySkill = {...skill} as NonPlayerCharacterSkill
        copySkill.ranks = ranks
        setSkill(copySkill)
        await ActorService.updateNemesisSkill(name, copySkill)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{skill.name}</DialogTitle>
            <DialogContentText style={{ textAlign: 'center' }}>{skill.ranks}</DialogContentText>
            <DialogActions>
                <InputNumberRangeSelectField defaultValue={skill.ranks} min={0} max={6} onCommit={handleEdit} />
            </DialogActions>
        </Dialog>
    )
}