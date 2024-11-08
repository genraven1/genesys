import {TypographyCenterTableCell} from "./TypographyTableCell";
import * as React from "react";
import {Fragment} from "react";
import {MenuItem, Select, TableCell, Typography} from "@mui/material";

interface Props {
    bool: boolean
}

export default function BooleanTableCell(props: Props) {
    const {bool} = props;

    return <TypographyCenterTableCell value={bool ? 'Yes' : 'No'}/>;
}