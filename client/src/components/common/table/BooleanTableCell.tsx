import {TypographyCenterTableCell} from "./TypographyTableCell";
import * as React from "react";

interface Props {
    bool: boolean
}

export default function BooleanTableCell(props: Props) {
    const {bool} = props;

    return <TypographyCenterTableCell value={bool ? 'Yes' : 'No'}/>;
}