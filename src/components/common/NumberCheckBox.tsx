import {Card, CardHeader, Divider, Grid, IconButton, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

interface ViewProps {
    title: string
    value: number
    check: boolean
    checkTitle: string
}

export function ViewNumberCheckBoxCard(props: ViewProps): JSX.Element {
    const {title, value, check, checkTitle} = props

    return (
        <Grid item xs>
            <Card>
                <Grid container spacing={0}>
                    <Grid item xs>
                        <Typography style={{ textAlign: 'center' }}>{title}</Typography>
                        <Divider />
                        <Typography style={{ textAlign: 'center' }}>{value || 0}</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography style={{ textAlign: 'center' }}>{checkTitle}</Typography>
                        <Divider />
                        <Typography style={{ textAlign: 'center' }}>
                            {check ? <CheckIcon color='primary' fontSize='small' />: <CancelIcon color='primary' fontSize='small' />}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

interface EditProps {
    title: string
    value: number
    check: boolean
    checkTitle: string
    onChange: (value: boolean) => void
}

export function EditNumberCheckBoxCard(props: EditProps): JSX.Element {
    const {title, value, check, onChange, checkTitle} = props

    const checkIsTrue = (
        <IconButton title='Commit' size='small' onClick={(): void => onChange(true)}>
            <CheckIcon color='primary' fontSize='small' />
        </IconButton>
    )

    const checkIsFalse = (
        <IconButton title='Cancel' size='small' onClick={(): void => onChange(false)}>
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