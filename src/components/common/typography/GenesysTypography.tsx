import {Typography} from "@mui/material";

interface Props {
    value: string
}

export function CenteredGenesysTypography(props: Props):JSX.Element {
    const {value} = props
    return <Typography style={{ textAlign: 'center' }} >{value}</Typography>
}