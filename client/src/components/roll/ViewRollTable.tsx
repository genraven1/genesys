import * as React from "react";
import {useState} from "react";
import Roll, {DieType} from "../../models/Roll";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {Box, Card, IconButton} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import {GenesysDescriptionTypographyCenterTableCell} from "../common/table/TypographyTableCell";

interface TableProps {
    roll: Roll
    onChange: (updatedRoll: Roll) => void
}

export default function ViewRollTable(props: TableProps): JSX.Element {
    const {roll, onChange} = props
    const [diceRoll, setDiceRoll] = useState<Roll>(roll)
    const headers = ['Die Type', 'Amount', 'Adjust']

    const onAddDiceChange = (type: DieType) => {
        let copyDiceRoll = diceRoll
        switch (type) {
            case DieType.Boost:
                copyDiceRoll.boost = copyDiceRoll.boost + 1
                break
            case DieType.Ability:
                copyDiceRoll.ability = copyDiceRoll.ability + 1
                break
            case DieType.Proficiency:
                copyDiceRoll.proficiency = copyDiceRoll.proficiency + 1
                break
            case DieType.Setback:
                copyDiceRoll.setback = copyDiceRoll.setback + 1
                break
            case DieType.Difficulty:
                copyDiceRoll.difficulty = copyDiceRoll.difficulty + 1
                break
            case DieType.Challenge:
                copyDiceRoll.challenge = copyDiceRoll.challenge + 1
                break
        }
        setDiceRoll(copyDiceRoll)
        onChange(copyDiceRoll)
    }

    const onRemoveDiceChange = (type: DieType) => {
        let copyDiceRoll = diceRoll
        switch (type) {
            case DieType.Boost:
                copyDiceRoll.boost = copyDiceRoll.boost - 1
                break
            case DieType.Ability:
                copyDiceRoll.ability = copyDiceRoll.ability - 1
                break
            case DieType.Proficiency:
                copyDiceRoll.proficiency = copyDiceRoll.proficiency - 1
                break
            case DieType.Setback:
                copyDiceRoll.setback = copyDiceRoll.setback - 1
                break
            case DieType.Difficulty:
                copyDiceRoll.difficulty = copyDiceRoll.difficulty - 1
                break
            case DieType.Challenge:
                copyDiceRoll.challenge = copyDiceRoll.challenge - 1
                break
        }
        setDiceRoll(copyDiceRoll)
        onChange(copyDiceRoll)
    }

    return (
        <TableContainer component={Card}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    <Row type={DieType.Boost} onAddDie={onAddDiceChange} onRemoveDie={onRemoveDiceChange} roll={roll}/>
                    <Row type={DieType.Ability} onAddDie={onAddDiceChange} onRemoveDie={onRemoveDiceChange}
                         roll={roll}/>
                    <Row type={DieType.Proficiency} onAddDie={onAddDiceChange} onRemoveDie={onRemoveDiceChange}
                         roll={roll}/>
                    <Row type={DieType.Setback} onAddDie={onAddDiceChange} onRemoveDie={onRemoveDiceChange}
                         roll={roll}/>
                    <Row type={DieType.Difficulty} onAddDie={onAddDiceChange} onRemoveDie={onRemoveDiceChange}
                         roll={roll}/>
                    <Row type={DieType.Challenge} onAddDie={onAddDiceChange} onRemoveDie={onRemoveDiceChange}
                         roll={roll}/>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

interface DieRowProps {
    type: DieType
    onAddDie: (type: DieType) => void
    onRemoveDie: (type: DieType) => void
    roll: Roll
}

function Row(props: DieRowProps): JSX.Element {
    const {type, onAddDie, onRemoveDie, roll} = props

    const getDiceNumber = (): string => {
        let number;
        switch (type) {
            case DieType.Boost:
                number = roll.boost
                break;
            case DieType.Ability:
                number = roll.ability
                break;
            case DieType.Proficiency:
                number = roll.proficiency
                break;
            case DieType.Setback:
                number = roll.setback
                break;
            case DieType.Difficulty:
                number = roll.difficulty
                break;
            case DieType.Challenge:
                number = roll.challenge
                break;
        }
        return String(number)
    }

    return (
        <TableRow>
            <GenesysDescriptionTypographyCenterTableCell value={type}/>
            <GenesysDescriptionTypographyCenterTableCell value={getDiceNumber()}/>
            <AdjustValueTableCell type={type} onAddDie={onAddDie} onRemoveDie={onRemoveDie}/>
        </TableRow>
    )
}

interface CellProps {
    type: DieType
    onAddDie: (type: DieType) => void
    onRemoveDie: (type: DieType) => void
}

function AdjustValueTableCell(props: CellProps): JSX.Element {
    const {type, onAddDie, onRemoveDie} = props

    const addDie = () => {
        onAddDie(type)
    }

    const removeDie = () => {
        onRemoveDie(type)
    }

    return (
        <TableCell>
            <Box component='span'>
                <IconButton title='Add' size='small' onClick={addDie}>
                    <Add color='primary' fontSize='small'/>
                </IconButton>
                <IconButton title='Remove' size='small' onClick={removeDie}>
                    <Remove color='primary' fontSize='small'/>
                </IconButton>
            </Box>
        </TableCell>
    )
}