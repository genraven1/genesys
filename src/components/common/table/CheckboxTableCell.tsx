import {IconButton, TableCell, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

interface Props {
    value: boolean
    onChange: (value: boolean) => void
}

export default function CheckboxTableCell(props: Props): JSX.Element {
    const {value, onChange} = props

    const handleClick = () => {
        onChange(value)
    }

    const checkIsTrue = (
        <IconButton title='True' size='small' onClick={(): void => handleClick()}>
            <CheckIcon color='primary' fontSize='small'/>
        </IconButton>
    )

    const checkIsFalse = (
        <IconButton title='False' size='small' onClick={(): void => handleClick()}>
            <CancelIcon color='primary' fontSize='small'/>
        </IconButton>
    )

    return (
        <TableCell>
            <Typography style={{textAlign: 'center'}}>{value ? checkIsTrue : checkIsFalse}</Typography>
        </TableCell>
    )
}