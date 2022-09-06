import {useState} from "react";
import {Dialog, DialogActions, DialogContentText, DialogTitle} from "@mui/material";
import {ActorSkill} from "../../models/actor/Actor";
import InputNumberRangeSelectField from "../common/InputNumberRangeSelect";
import ActorService from "../../services/ActorService";

interface Props {
    open: boolean
    name: string
    actorSkill: ActorSkill
    onClose: () => void
}

export default function EditSkillDialog(props: Props) {
    const { open, actorSkill, name, onClose } = props;
    const [skill, setSkill] = useState<ActorSkill>(actorSkill);

    const handleEdit = async (ranks: number): Promise<void> => {
        const copySkill = {...skill} as ActorSkill
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