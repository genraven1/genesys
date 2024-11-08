import {MenuItem, Select, TableCell} from "@mui/material";
import {Fragment} from "react";
import * as React from "react";
import BooleanTableCell from "./BooleanTableCell";

interface Props {
    bool: boolean
    disabled: boolean
    onChange: (value: boolean) => void
    span?: number
}

export default function EditableBooleanTableCell(props: Props) {
    const {bool, disabled, onChange, span} = props;

    const renderTableCell = () => {
        if (disabled) {
            return <BooleanTableCell bool={bool}/>;
        }
        return (
            <TableCell style={{textAlign: 'center'}} colSpan={span}>
                <Select
                    value={bool ? 'Yes' : 'No'}
                    onChange={(e) => onChange(e.target.value === 'Yes')}
                    label="Ranked"
                    disabled={disabled}
                    variant={"standard"}>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                </Select>
            </TableCell>
        );
    };

    return (
        <Fragment>
            {renderTableCell()}
        </Fragment>
    )
}