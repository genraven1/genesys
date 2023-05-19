import {useState} from "react";
import {Dialog, DialogActions, DialogContentText, DialogTitle} from "@mui/material";
import InputNumberRangeSelectField from "../../../common/InputNumberRangeSelect";
import ActorService from "../../../../services/ActorService";
import {ActorSkill, ActorType} from "../../../../models/actor/Actor";

interface Props {
    open: boolean
    name: string
    type: ActorType
    actorSkill: ActorSkill
    onClose: () => void
}

export default function NonPlayerCharacterEditSkillDialog(props: Props) {
    const { open, actorSkill, name, type, onClose } = props
    const [skill, setSkill] = useState<ActorSkill>(actorSkill)

    const handleEdit = async (ranks: number): Promise<void> => {
        const copySkill = {...skill} as ActorSkill
        copySkill.ranks = ranks
        setSkill(copySkill)
        switch (type) {
            case ActorType.Minion:
                await ActorService.updateMinionSkill(name, copySkill)
                break
            case ActorType.Rival:
                await ActorService.updateRivalSkill(name, copySkill)
                break
            case ActorType.Nemesis:
                await ActorService.updateNemesisSkill(name, copySkill)
                break
        }
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