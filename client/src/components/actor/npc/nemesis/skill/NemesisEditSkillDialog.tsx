import {useState} from "react";
import {Dialog, DialogActions, DialogContentText, DialogTitle} from "@mui/material";
import Nemesis from "../../../../../models/actor/npc/Nemesis";
import {ActorSkill} from "../../../../../models/actor/Actor";
import ActorService from "../../../../../services/ActorService";
import InputNumberRangeSelectField from "../../../../common/InputNumberRangeSelect";

interface Props {
    open: boolean
    nemesis: Nemesis
    actorSkill: ActorSkill
    onClose: () => void
}

export default function NemesisEditSkillDialog(props: Props) {
    const { open, actorSkill, nemesis, onClose } = props
    const [skill, setSkill] = useState<ActorSkill>(actorSkill)

    const handleEdit = async (ranks: number): Promise<void> => {
        const copySkill = {...skill} as ActorSkill
        copySkill.ranks = ranks
        setSkill(copySkill)
        nemesis.skills.forEach((actorSkill, index) => {
            if (actorSkill.name === skill.name) {
                actorSkill.ranks = ranks
                nemesis.skills[index] = actorSkill
            }
        })
        await ActorService.updateNemesisSkill(nemesis.name, copySkill)
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