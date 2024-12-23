import {DialogTitle} from "@mui/material";

interface Props {
    title: string
}

export default function CenteredDialogTitle(props: Props) {
    const {title} = props;
    return <DialogTitle style={{textAlign: "center"}}>{title}</DialogTitle>;
}