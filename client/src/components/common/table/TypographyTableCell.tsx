import React, {useState} from "react";
import {Button, TableCell, Typography} from "@mui/material";
import GenesysDescriptionTypography from "../typography/GenesysDescriptionTypography";
import Actor, {ActorSkill, getActorCharacteristicRanks} from "../../../models/actor/Actor";
import GenesysSkillDiceTypography from "../typography/GenesysSkillDiceTypography";
import {Difficulty} from "../../../models/common/Difficulty";
import GenesysDifficultyDiceTypography from "../typography/GenesysDifficultyDiceTypography";
import Cost, {CostType} from "../../../models/common/Cost";
import Limit, {LimitType} from "../../../models/common/Limit";
// import {GenesysSymbols} from "../../../models/roll/GenesysSymbols";
import DiceRollerDialog from "../../roll/DiceRollerDialog";

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

interface ButtonProps {
    value: string
    onClick: () => void
}

export function TableCellButton(props: ButtonProps) {
    const {value, onClick} = props;

    return (
        <TableCell style={{textAlign: 'center'}}>
            <Button onClick={onClick}>
                {value}
            </Button>
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

interface DiceRollProps {
    actor: Actor
    skill: ActorSkill
}

export function GenesysDicePoolCenterTableCellButton(props: DiceRollProps) {
    const {actor, skill} = props;
    const [openCustomRollBackDrop, setOpenCustomRollBackDrop] = useState(false);
    // const [symbolCounts, setSymbolCounts] = useState({
    //     [GenesysSymbols.Success]: 0,
    //     [GenesysSymbols.Advantage]: 0,
    //     [GenesysSymbols.Triumph]: 0,
    //     [GenesysSymbols.Failure]: 0,
    //     [GenesysSymbols.Threat]: 0,
    //     [GenesysSymbols.Despair]: 0,
    //     [GenesysSymbols.Blank]: 0,
    // });
    // const [dicePool, setDicePool] = useState({
    //     boost: 0,
    //     setback: 0,
    //     ability: Math.max(getCharacteristicRanks(actor, skill), skill.ranks) - Math.min(getCharacteristicRanks(actor, skill), skill.ranks),
    //     difficulty: 0,
    //     proficiency: Math.min(getCharacteristicRanks(actor, skill), skill.ranks),
    //     challenge: 0,
    // });
    const dicePool = {
        boost: 0,
        setback: 0,
        ability: Math.max(getActorCharacteristicRanks(actor, skill), skill.ranks) - Math.min(getActorCharacteristicRanks(actor, skill), skill.ranks),
        difficulty: 0,
        proficiency: Math.min(getActorCharacteristicRanks(actor, skill), skill.ranks),
        challenge: 0,
    };

    return (
        <TableCell style={{textAlign: 'center'}}>
            <Button onClick={(): void => setOpenCustomRollBackDrop(true)}>
                <GenesysSkillDiceTypography characteristicRanks={getActorCharacteristicRanks(actor, skill)}
                                            skillRanks={skill.ranks}/>
            </Button>
            {openCustomRollBackDrop && <DiceRollerDialog open={openCustomRollBackDrop}
                                                         onClose={(): void => setOpenCustomRollBackDrop(false)}
                                                         boost={dicePool.boost}
                                                         setback={dicePool.setback}
                                                         ability={dicePool.ability}
                                                         difficulty={dicePool.difficulty}
                                                         proficiency={dicePool.proficiency}
                                                         challenge={dicePool.challenge}/>}
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