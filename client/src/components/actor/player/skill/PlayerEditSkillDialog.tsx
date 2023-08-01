import {useState} from "react";
import {Dialog, DialogActions, DialogContentText, DialogTitle} from "@mui/material";
import InputNumberRangeSelectField from "../../../common/InputNumberRangeSelect";
import ActorService from "../../../../services/ActorService";
import {PlayerSkill} from "../../../../models/actor/player/Player";

interface Props {
    open: boolean
    name: string
    actorSkill: PlayerSkill
    onClose: () => void
}

export default function PlayerEditSkillDialog(props: Props) {
    const { open, actorSkill, name, onClose } = props
    const [skill, setSkill] = useState<PlayerSkill>(actorSkill)

    const handleEdit = async (ranks: number): Promise<void> => {
        const copySkill = {...skill} as PlayerSkill
        copySkill.ranks = ranks
        setSkill(copySkill)
        await ActorService.updatePlayerSkill(name, copySkill)
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