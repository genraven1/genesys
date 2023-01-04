import * as React from "react";
import {Fragment, useState} from "react";
import Roll, {DieType} from "../../models/Roll";
import GenesysDescriptionTypography from "../common/GenesysDescriptionTypography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {Box, Card, IconButton} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";

interface TableProps {
    roll: Roll
    onChange: (updatedRoll: Roll) => void
}

export default function ViewRollTable(props: TableProps): JSX.Element {
    const {roll, onChange} = props
    const [diceRoll, setDiceRoll] = useState<Roll>(roll)

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
                <TableHead>
                    <TableRow>
                        <TableCell>Die Type</TableCell>
                        <TableCell>Adjust</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Row type={DieType.Boost} onAddDie={onAddDiceChange} onRemoveDie={onRemoveDiceChange}/>
                    <Row type={DieType.Ability} onAddDie={onAddDiceChange} onRemoveDie={onRemoveDiceChange}/>
                    <Row type={DieType.Proficiency} onAddDie={onAddDiceChange} onRemoveDie={onRemoveDiceChange}/>
                    <Row type={DieType.Setback} onAddDie={onAddDiceChange} onRemoveDie={onRemoveDiceChange}/>
                    <Row type={DieType.Difficulty} onAddDie={onAddDiceChange} onRemoveDie={onRemoveDiceChange}/>
                    <Row type={DieType.Challenge} onAddDie={onAddDiceChange} onRemoveDie={onRemoveDiceChange}/>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

interface DieRowProps {
    type: DieType
    onAddDie: (type: DieType) => void
    onRemoveDie: (type: DieType) => void
}

function Row(props: DieRowProps): JSX.Element {
    const {type, onAddDie, onRemoveDie} = props

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <GenesysDescriptionTypography text={type}/>
                </TableCell>
                <AdjustValueTableCell type={type} onAddDie={onAddDie} onRemoveDie={onRemoveDie}/>
            </TableRow>
        </Fragment>
    )
}

interface CellProps {
    type: DieType
    onAddDie: (type: DieType) => void
    onRemoveDie: (type: DieType) => void
}

function AdjustValueTableCell(props: CellProps): JSX.Element {
    const {type,onAddDie,onRemoveDie} = props

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
                    <Add color='primary' fontSize='small' />
                </IconButton>
                <IconButton title='Remove' size='small' onClick={removeDie}>
                    <Remove color='primary' fontSize='small' />
                </IconButton>
            </Box>
        </TableCell>
    )
}