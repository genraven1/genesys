import React from "react";
import {TableCell, Typography} from "@mui/material";
import GenesysDescriptionTypography from "../typography/GenesysDescriptionTypography";
import Actor, {ActorSkill, getCharacteristicRanks} from "../../../models/actor/Actor";
import GenesysSkillDiceTypography from "../typography/GenesysSkillDiceTypography";

interface LeftProps {
    value: string
}

export function TypographyLeftTableCell(props: LeftProps): JSX.Element {
    const {value} = props
    return (
        <TableCell style={{textAlign: 'left'}}>
            <Typography>{value}</Typography>
        </TableCell>
    )
}

interface CenterProps {
    value: string
    span?: number
}

export function TypographyCenterTableCell(props: CenterProps): JSX.Element {
    const {value, span} = props
    return (
        <TableCell style={{textAlign: 'center'}} colSpan={span}>
            <Typography>{value}</Typography>
        </TableCell>
    )
}

interface DescriptionCenterProps {
    value: string
    span?: number
}

export function GenesysDescriptionTypographyCenterTableCell(props: DescriptionCenterProps): JSX.Element {
    const {value, span} = props
    return (
        <TableCell style={{textAlign: 'center'}} colSpan={span}>
            <GenesysDescriptionTypography text={value}/>
        </TableCell>
    )
}

interface SkillCenterProps {
    actor: Actor
    skill: ActorSkill
}

export function GenesysDicePoolCenterTableCell(props: SkillCenterProps): JSX.Element {
    const {actor, skill} = props
    return (
        <TableCell style={{textAlign: 'center'}}>
            <GenesysSkillDiceTypography characteristicRanks={getCharacteristicRanks(actor, skill)}
                                        skillRanks={skill.ranks}/>
        </TableCell>
    )
}