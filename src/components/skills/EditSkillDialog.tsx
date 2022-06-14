import {useState} from "react";
import {Dialog, DialogActions, DialogContentText, DialogTitle} from "@mui/material";
import {ActorSkill} from "../../models/actor/Actor";
import Nemesis from "../../models/actor/npc/Nemesis";
import InputNumberRangeSelectField from "../input/InputNumberRangeSelect";
import ActorService from "../../services/ActorService";

interface Props {
    open: boolean
    actorSkill: ActorSkill
    nemesisProp: Nemesis
    onClose: () => void
}

export default function EditSkillDialog(props: Props) {
    const { open, actorSkill, nemesisProp, onClose } = props;
    const [skill, setSkill] = useState<ActorSkill>(actorSkill);
    const [nemesis, setNemesis] = useState<Nemesis>(nemesisProp)

    const updateSkillRanks = (ranks: number) => {
        const copySkill = {...skill} as ActorSkill
        console.log(ranks)
        copySkill.ranks = ranks
        console.log(copySkill)
        setSkill(copySkill)
        console.log(skill)
    }

    const getSkillIndex = (name: string): number => {
        return nemesis.skills.findIndex(skill => skill.name === name)
    }

    const replaceSkill = (): void => {
        const copyNemesis = {...nemesis} as Nemesis
        let copySkills = copyNemesis.skills
        copySkills[getSkillIndex(skill.name)] = skill
        copyNemesis.skills = copySkills
        setNemesis(copyNemesis)
        console.log(nemesis.skills)
    }

    const handleEdit = async (ranks: number): Promise<void> => {
        updateSkillRanks(ranks)
        replaceSkill()
        await ActorService.updateNemesis(nemesis.name, nemesis)
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