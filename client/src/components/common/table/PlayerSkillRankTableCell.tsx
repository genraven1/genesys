import TableCell from "@mui/material/TableCell";
import InputNumberRangeSelectField from "../InputNumberRangeSelect";
import {PlayerSkill} from "../../../models/actor/player/Player";

interface Props {
    skill: PlayerSkill
    onSkillChange: (skill: PlayerSkill) => void
}

export default function PlayerSkillRankTableCell(props: Props): JSX.Element {
    const {skill, onSkillChange} = props

    const handleEdit = async (ranks: number): Promise<void> => {
        skill.ranks = ranks
        onSkillChange(skill)
    }

    return (
        <TableCell>
            <InputNumberRangeSelectField defaultValue={skill.ranks} min={0} max={6} onCommit={handleEdit} />
        </TableCell>
    )
}