import {Card, CardHeader, Divider, Grid, IconButton, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

interface ViewProps {
    title: string
    value: number
    check: boolean
}

export function ViewNumberCheckBoxCard(props: ViewProps): JSX.Element {
    const {title, value, check} = props

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={title} style={{ textAlign: 'center' }} />
                <Divider />
                <Typography style={{ textAlign: 'center' }} >{value}</Typography>
                {check ? <CheckIcon color='primary' fontSize='small' />: <CancelIcon color='primary' fontSize='small' />}
            </Card>
        </Grid>
    )
}

interface EditProps {
    title: string
    value: number
    check: boolean
}

export function EditNumberCheckBoxCard(props: EditProps): JSX.Element {
    const {title, value, check} = props

    const onChange = () => {

    }

    const checkIsTrue = (
        <IconButton title='Commit' size='small' onClick={(): void => onChange()}>
            <CheckIcon color='primary' fontSize='small' />
        </IconButton>
    )

    const checkIsFalse = (
        <IconButton title='Cancel' size='small' onClick={(): void => onChange()}>
            <CancelIcon color='primary' fontSize='small' />
        </IconButton>
    )

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={title} style={{ textAlign: 'center' }} />
                <Divider />
                <Typography style={{ textAlign: 'center' }} >{value}</Typography>
                {check ? checkIsTrue : checkIsFalse}
            </Card>
        </Grid>
    )
}