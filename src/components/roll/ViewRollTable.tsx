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
import {Button, Card} from "@mui/material";

interface TableProps {
    roll: Roll
}

export default function ViewRollTable(props: TableProps): JSX.Element {
    const {roll} = props
    const [diceRoll, setDiceRoll] = useState<Roll>(roll)

    const onChange = (type: DieType, value: number) => {
        let copyDiceRoll = diceRoll
        switch (type) {
            case DieType.Boost:
                copyDiceRoll.boost = value
                break
            case DieType.Ability:
            case DieType.Proficiency:
            case DieType.Setback:
            case DieType.Difficulty:
            case DieType.Challenge:
                break
        }
    }

    return (
        <TableContainer component={Card}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={3} style={{textAlign: "center"}}>Assemble Dice Roll</TableCell>
                    </TableRow>
                </TableHead>
                <TableHead>
                    <TableRow>
                        <TableCell>Die Type</TableCell>
                        <TableCell>Add</TableCell>
                        <TableCell>Subtract</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Row type={DieType.Boost} value={roll.boost} onChange={onChange} />
                </TableBody>
            </Table>
        </TableContainer>
    )
}

interface DieRowProps {
    type: DieType
    value: number
    onChange: (type: DieType, value: number) => void
}

function Row(props: DieRowProps): JSX.Element {
    let {type, value, onChange} = props

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <GenesysDescriptionTypography text={type}/>
                </TableCell>
                <TableCell>
                    <Button onClick={() => onChange(type, value++)}>Add</Button>
                </TableCell>
                <TableCell>
                    <Button onClick={() => onChange(type, value--)}>Subtract</Button>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}