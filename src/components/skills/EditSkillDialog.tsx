import {useState} from "react";
import {Dialog, DialogActions, DialogContentText, DialogTitle, Typography} from "@mui/material";
import {ActorSkill} from "../../models/actor/Actor";
import Nemesis from "../../models/actor/npc/Nemesis";
import InputNumberRangeSelectField from "../input/InputNumberRangeSelect";

interface Props {
    open: boolean
    actorSkill: ActorSkill
    nemesisProp: Nemesis
    onClose: () => void
}

export default function EditSkillDialog(props: Props) {
    const { open, actorSkill, nemesisProp, onClose } = props;
    const [ skill, setSkill ] = useState(actorSkill);
    const [nemesis, setNemesis] = useState<Nemesis>(nemesisProp)

    const handleEdit = async (): Promise<void> => {

    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{skill.name}</DialogTitle>
            <DialogContentText>
                    <Typography style={{ textAlign: 'center' }} >{skill.ranks}</Typography>
            </DialogContentText>
            <DialogActions>
                <InputNumberRangeSelectField defaultValue={skill.ranks} min={0} max={5} onCommit={handleEdit} />
            </DialogActions>
        </Dialog>
    )
}