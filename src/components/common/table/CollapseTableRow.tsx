import {TableCell} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "./TypographyTableCell";
import {Fragment, useState} from "react";

interface Props {
    name: string
    values: string[]
}

export default function CollapseTableRow(props: Props): JSX.Element {
    const{name,values} = props
    const [open, setOpen] = useState(false)

    const renderTableCells = () => {
        if(!values) {return}
        else {
            return values.forEach((value) => {
                <TypographyCenterTableCell value={value}/>
            })
        }

    }

    return(
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TypographyLeftTableCell value={name}/>
                {values.forEach((value) => {
                    <TypographyCenterTableCell value={value}/>
                })}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={values.length}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}