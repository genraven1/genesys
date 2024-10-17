import {Card, Divider, Grid, IconButton, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import EditNumberCard from "./EditNumberCard";

interface ViewProps {
    title: string
    value: number
    check: boolean
    checkTitle: string
}

export function ViewNumberCheckBoxCard(props: ViewProps) {
    const {title, value, check, checkTitle} = props

    return (
        <Grid item xs>
            <Card>
                <Grid container spacing={0}>
                    <Grid item xs>
                        <Typography style={{textAlign: 'center'}}>{title}</Typography>
                        <Divider/>
                        <Typography style={{textAlign: 'center'}}>{value || 0}</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography style={{textAlign: 'center'}}>{checkTitle}</Typography>
                        <Divider/>
                        <Typography style={{textAlign: 'center'}}>
                            {check ? <CheckIcon color='primary' fontSize='small'/> :
                                <CancelIcon color='primary' fontSize='small'/>}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

interface EditPriceProps {
    value: number
    check: boolean
    checkTitle: string
    onBooleanChange: (value: boolean) => void
    onNumberChange: (value: number) => void
}

export function EditPriceCheckBoxCard(props: EditPriceProps) {
    const {value, check, onBooleanChange, checkTitle, onNumberChange} = props

    const handleClick = () => {
        onBooleanChange(check)
    }

    const checkIsTrue = (
        <IconButton title='Commit' size='small' onClick={(): void => handleClick()}>
            <CheckIcon color='primary' fontSize='small'/>
        </IconButton>
    )

    const checkIsFalse = (
        <IconButton title='Cancel' size='small' onClick={(): void => handleClick()}>
            <CancelIcon color='primary' fontSize='small'/>
        </IconButton>
    )

    return (
        <Grid item xs>
            <Card>
                <Grid container spacing={0}>
                    <Grid item xs>
                        <EditNumberCard value={value} onChange={onNumberChange} title={'Price'}/>
                    </Grid>
                    <Grid item xs>
                        <Typography style={{textAlign: 'center'}}>{checkTitle}</Typography>
                        <Divider/>
                        <Typography style={{textAlign: 'center'}}>
                            {check ? checkIsTrue : checkIsFalse}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}