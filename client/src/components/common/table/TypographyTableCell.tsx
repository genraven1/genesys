import React from "react";
import { TableCell, Typography} from "@mui/material";
import GenesysDescriptionTypography from "../typography/GenesysDescriptionTypography";
import Actor, {ActorSkill, getCharacteristicRanks} from "../../../models/actor/Actor";
import GenesysSkillDiceTypography from "../typography/GenesysSkillDiceTypography";
import {Difficulty} from "../../../models/common/Difficulty";
import GenesysDifficultyDiceTypography from "../typography/GenesysDifficultyDiceTypography";
import Cost, {CostType} from "../../../models/common/Cost";
import Limit, {LimitType} from "../../../models/common/Limit";

interface LeftProps {
    value: string
}

export function TypographyLeftTableCell(props: LeftProps) {
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

export function TypographyCenterTableCell(props: CenterProps) {
    const {value, span} = props
    return (
        <TableCell style={{textAlign: 'center'}} colSpan={span}>
            <Typography>{value}</Typography>
        </TableCell>
    )
}

interface CostProps {
    cost: Cost
    span?: number
}

export function CostTableCell(props: CostProps) {
    const {cost, span} = props

    const renderCost = () => {
        switch (cost.type) {
            case CostType.None:
                return 'None'
            case CostType.Strain:
                return cost.amount + ' Strain'
            case CostType.StoryPoint:
                return cost.amount + ' Story Point'
        }
    }

    return (
        <TableCell style={{textAlign: 'center'}} colSpan={span}>
            <Typography>{renderCost()}</Typography>
        </TableCell>
    )
}

interface LimitProps {
    limit: Limit
    span?: number
}

export function LimitTableCell(props: LimitProps) {
    const {limit, span} = props

    const renderLimit = () => {
        switch (limit.type) {
            case LimitType.PerRound:
                return limit.limit + ' Per Round'
            case LimitType.PerEncounter:
                return limit.limit + ' Per Encounter'
            case LimitType.PerSession:
                return limit.limit + ' Per Session'
            case LimitType.None:
                return 'None'
        }
    }

    return (
        <TableCell style={{textAlign: 'center'}} colSpan={span}>
            <Typography>{renderLimit()}</Typography>
        </TableCell>
    )
}

interface DescriptionCenterProps {
    value: string
    span?: number
}

export function GenesysDescriptionTypographyCenterTableCell(props: DescriptionCenterProps) {
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

export function GenesysDicePoolCenterTableCell(props: SkillCenterProps) {
    const {actor, skill} = props
    return (
        <TableCell style={{textAlign: 'center'}}>
            <GenesysSkillDiceTypography characteristicRanks={getCharacteristicRanks(actor, skill)}
                                        skillRanks={skill.ranks}/>
        </TableCell>
    )
}

interface DifficultyProps {
    difficulty: Difficulty
}

export function GenesysDifficultyCenterTableCell(props: DifficultyProps) {
    const {difficulty} = props
    return (
        <TableCell style={{textAlign: 'center'}}>
            <GenesysDifficultyDiceTypography difficulty={difficulty}/>
        </TableCell>
    )
}