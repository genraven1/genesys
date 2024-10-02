import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Skill from "../../models/actor/Skill";
import SkillView from "./SkillView";

interface Props {
    skill: Skill
    open: boolean
    onClose: () => void
}

export default function SkillBackdrop(props: Props) {
    const {skill, open, onClose} = props;

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClose}>
            <SkillView skill={skill}/>
        </Backdrop>
    );
}
