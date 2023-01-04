import Roll from "../../models/Roll";
import {useState} from "react";
import GenesysDescriptionTypography from "../common/GenesysDescriptionTypography";

export function GenesysRollConversion(roll: Roll): JSX.Element {
    const [text, setText] = useState('')

    return (
        <GenesysDescriptionTypography text={text}/>
    )
}