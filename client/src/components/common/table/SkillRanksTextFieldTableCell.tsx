import {TextField} from "@mui/material";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import {ActorSkill} from "../../../models/actor/Actor";

interface Props {
    skill: ActorSkill
    onChange: (skill: ActorSkill) => void
    disabled: boolean
}

export default function SkillRanksTextFieldTableCell(props: Props) {
    const {skill, onChange, disabled} = props;

    return (
        <TableCell style={{textAlign: 'center'}}>
            <TextField
                type="number"
                value={skill.ranks}
                label={'Ranks'}
                fullWidth
                onChange={(e) => onChange({...skill, ranks: Number(e.target.value)})}
                inputProps={{min: 0, max: 5}}
                disabled={disabled}
            />
        </TableCell>
    )
}