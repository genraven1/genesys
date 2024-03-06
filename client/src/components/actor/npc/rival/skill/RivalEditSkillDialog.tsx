import {useState} from "react";
import {Dialog, DialogActions, DialogContentText, DialogTitle} from "@mui/material";
import InputNumberRangeSelectField from "../../../../common/InputNumberRangeSelect";
import ActorService from "../../../../../services/ActorService";
import {ActorSkill} from "../../../../../models/actor/Actor";
import Rival from "../../../../../models/actor/npc/Rival";

interface Props {
    open: boolean
    rival: Rival
    actorSkill: ActorSkill
    onClose: () => void
}

export default function RivalEditSkillDialog(props: Props) {
    const { open, actorSkill, rival, onClose } = props
    const [skill, setSkill] = useState<ActorSkill>(actorSkill)

    const handleEdit = async (ranks: number): Promise<void> => {
        const copySkill = {...skill} as ActorSkill
        copySkill.ranks = ranks
        setSkill(copySkill)
        rival.skills.forEach((actorSkill, index) => {
            if (actorSkill.name === skill.name) {
                actorSkill.ranks = ranks
                rival.skills[index] = actorSkill
            }
        })
        await ActorService.updateRival(rival.name, rival)
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