import TableCell from "@mui/material/TableCell";
import InputNumberRangeSelectField from "../InputNumberRangeSelect";
import {PlayerSkill} from "../../../models/actor/player/Player";
import {TextField} from "@mui/material";
import * as React from "react";

interface Props {
    skill: PlayerSkill
    onSkillChange: (skill: PlayerSkill) => void
    disabled: boolean
}

export default function PlayerSkillRankTableCell(props: Props) {
    const {skill, onSkillChange, disabled} = props

    // const handleEdit = async (ranks: number): Promise<void> => {
    //     skill.ranks = ranks
    //     onSkillChange(skill)
    // }

    return (
        <TableCell style={{textAlign: "center"}}>
            {/*<InputNumberRangeSelectField defaultValue={skill.ranks} min={0} max={6} onCommit={handleEdit}/>*/}
            <TextField
                type="number"
                value={skill.ranks}
                fullWidth
                onChange={(e) => onSkillChange({...skill, ranks: Number(e.target.value)})}
                inputProps={{min: 0, max: 5}}
                disabled={disabled}
            />
        </TableCell>
    )
}