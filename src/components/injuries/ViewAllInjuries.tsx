import {Fragment, useEffect, useState} from "react";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import Injury from "../../models/Injury";
import TableRow from "@mui/material/TableRow";
import {GenesysDifficultyCenterTableCell, TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import ActionsTableCell from "../common/table/ActionsTableCell";
import {Path} from "../../services/Path";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import CreateInjuryDialog from "./CreateInjuryDialog";

interface Props {
    injury: Injury
    columns: number
}

function Row(props: Props): JSX.Element {
    const {injury, columns} = props
    const [open, setOpen] = useState(false)

    const renderDiceRange = (): string => {
        return String(injury.min) + '-' + String(injury.max)
    }

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={injury.name}/>
                <TypographyCenterTableCell value={renderDiceRange()}/>
                <GenesysDifficultyCenterTableCell difficulty={injury.severity}/>
                <ActionsTableCell name={injury.name} path={Path.Injury}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table sx={{margin: 1}}>
                            <TableBody>
                                <GenesysDescriptionTypography text={injury.description}/>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function ViewAllInjuries(): JSX.Element {
    const [injuries, setInjuries] = useState<Injury[]>([])
    const [openInjuryCreationDialog, setOpenInjuryCreationDialog] = useState(false)
    const headers = ['Name', 'Min-Max', 'Severity', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                await fetch("/injuries")
                    .then((res) => res.json())
                    .then((data) => setInjuries(data as Injury[]))
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Critical Injuries'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenInjuryCreationDialog(true)}>Create Critical
                    Injury</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {injuries.map((injury: Injury) => (
                                <Row key={injury.name} injury={injury} columns={headers.length}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openInjuryCreationDialog && <CreateInjuryDialog open={openInjuryCreationDialog}
                                                             onClose={(): void => setOpenInjuryCreationDialog(false)}/>}
        </Card>
    );
}