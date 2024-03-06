import {useState} from "react";
import {Dialog, DialogActions, DialogContentText, DialogTitle} from "@mui/material";
import InputNumberRangeSelectField from "../../../common/InputNumberRangeSelect";
import ActorService from "../../../../services/ActorService";
import {ActorSkill, ActorType} from "../../../../models/actor/Actor";
import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";

interface Props {
    open: boolean
    npc: SingleNonPlayerCharacter
    type: ActorType
    actorSkill: ActorSkill
    onClose: () => void
}

export default function NonPlayerCharacterEditSkillDialog(props: Props) {
    const { open, actorSkill, npc, type, onClose } = props
    const [skill, setSkill] = useState<ActorSkill>(actorSkill)

    const handleEdit = async (ranks: number): Promise<void> => {
        const copySkill = {...skill} as ActorSkill
        copySkill.ranks = ranks
        setSkill(copySkill)
        switch (type) {
            case ActorType.Rival:
                await ActorService.updateRivalSkill(npc.name, copySkill)
                break
            case ActorType.Nemesis:
                npc.skills.forEach((actorSkill, index) => {
                    if (actorSkill.name === skill.name) {
                        actorSkill.ranks = ranks
                        npc.skills[index] = actorSkill
                    }
                })
                await ActorService.updateNemesisSkill(npc.name, copySkill)
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