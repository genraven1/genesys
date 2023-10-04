import {IconButton, TableCell, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

interface Props {
    value: boolean
    onAddition: (value: boolean) => void
    onRemoval: (value: boolean) => void
}

export default function CheckboxTableCell(props: Props): JSX.Element {
    const {value, onAddition, onRemoval} = props

    const handleClickOnAddition = () => {
        onAddition(value)
    }

    const handleClickOnRemoval = () => {
        onRemoval(value)
    }

    const checkIsTrue = (
        <IconButton title='True' size='small' onClick={(): void => handleClickOnRemoval()}>
            <CheckIcon color='primary' fontSize='small'/>
        </IconButton>
    )

    const checkIsFalse = (
        <IconButton title='False' size='small' onClick={(): void => handleClickOnAddition()}>
            <CancelIcon color='primary' fontSize='small'/>
        </IconButton>
    )

    return (
        <TableCell>
            <Typography style={{textAlign: 'center'}}>{value ? checkIsTrue : checkIsFalse}</Typography>
        </TableCell>
    )
}