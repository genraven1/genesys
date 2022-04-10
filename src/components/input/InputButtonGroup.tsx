import { Box, IconButton } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface Props {
    onIncrease: () => void,
    onDecrease: () => void,
}

export default function InputButtonGroup(props: Props): JSX.Element {
    const { onIncrease, onDecrease } = props;

    return (
        <Box component='span'>
            <IconButton title='Increase' size='medium' onClick={(): void => onIncrease()}>
                <ArrowUpwardIcon color='primary' fontSize='medium' />
            </IconButton>
            <IconButton title='Decrease' size='medium' onClick={(): void => onDecrease()}>
                <ArrowDownwardIcon color='primary' fontSize='medium' />
            </IconButton>
        </Box>
    )
}