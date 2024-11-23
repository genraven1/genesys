import {Button, CardHeader} from "@mui/material";
import * as React from "react";

interface Props {
    title: string
    onClick: () => void
    buttonText: string
}

export default function CenteredCardHeaderWithDialog(props: Props) {
    const {title, onClick, buttonText} = props;

    const renderButton = () => {
        return <Button color='primary' variant='contained' onClick={onClick}>{buttonText}</Button>
    }

    return <CardHeader style={{textAlign: 'center'}} title={title} action={renderButton()}/>;
}