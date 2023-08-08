import {CardHeader} from "@mui/material";
import * as React from "react";

interface Props {
    title: string
}

export default function CenteredCardHeader(props: Props): JSX.Element {
    const {title} = props

    return (
        <CardHeader style={{textAlign: 'center'}} title={title}/>
    )
}