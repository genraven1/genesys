import Skill from "../../../models/actor/Skill";
import {TypographyCenterTableCell} from "./TypographyTableCell";
import * as React from "react";
import {renderSkillName} from "../skill/SkillRenders";

interface Props {
    skill: Skill
}
export default function SkillTableCell(props: Props): JSX.Element {
    const {skill} = props
    return <TypographyCenterTableCell value={renderSkillName(skill)}/>
}