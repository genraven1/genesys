import { Box, IconButton } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface Props {
    onIncrease: (value: number) => void,
    onDecreaseByOne: () => void,
    onDecreaseByFive: () => void,
    onDecreaseByTen: () => void,
    onDecreaseByHundred: () => void,
}

export default function PriceButtonGroup(props: Props): JSX.Element {
    const { onIncrease, onDecreaseByOne, onDecreaseByFive, onDecreaseByTen, onDecreaseByHundred } = props;

    return (
        <Box component='span'>
            <IconButton title='Increase By One' size='medium' onClick={(): void => onIncrease(1)}>
                <ArrowUpwardIcon color='primary' fontSize='medium' />
            </IconButton>
            <IconButton title='Increase By Five' size='medium' onClick={(): void => onIncrease(5)}>
                <ArrowUpwardIcon color='primary' fontSize='medium' />
            </IconButton>
            <IconButton title='Increase By Ten' size='medium' onClick={(): void => onIncrease(10)}>
                <ArrowUpwardIcon color='primary' fontSize='medium' />
            </IconButton>
            <IconButton title='Increase By One Hundred' size='medium' onClick={(): void => onIncrease(100)}>
                <ArrowUpwardIcon color='primary' fontSize='medium' />
            </IconButton>
            <IconButton title='Decrease By One' size='medium' onClick={(): void => onDecreaseByOne()}>
                <ArrowDownwardIcon color='primary' fontSize='medium' />
            </IconButton>
            <IconButton title='Decrease By Five' size='medium' onClick={(): void => onDecreaseByFive()}>
                <ArrowDownwardIcon color='primary' fontSize='medium' />
            </IconButton>
            <IconButton title='Decrease By ' size='medium' onClick={(): void => onDecreaseByTen()}>
                <ArrowDownwardIcon color='primary' fontSize='medium' />
            </IconButton>
            <IconButton title='Decrease By ' size='medium' onClick={(): void => onDecreaseByHundred()}>
                <ArrowDownwardIcon color='primary' fontSize='medium' />
            </IconButton>
        </Box>
    )
}