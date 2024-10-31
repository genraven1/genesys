import {Fragment} from "react";
import * as React from "react";
import {useLocation} from "react-router-dom";
import {Button, TableFooter} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";

interface Props {
    addRow: () => void
    disabled: boolean
}

export default function QualityTableFooter(props: Props) {
    const {addRow, disabled} = props;

    const renderTableFooter = () => {
        if (!disabled) {
            return (
                <TableFooter>
                    <TableRow key={'Footer'}>
                        <Button variant='contained' color='primary' onClick={addRow} startIcon={<AddIcon/>}>Add
                            Quality</Button>
                    </TableRow>
                </TableFooter>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <Fragment>
            {renderTableFooter()}
        </Fragment>
    )
}