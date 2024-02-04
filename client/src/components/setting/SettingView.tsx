import {Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography} from '@mui/material';
import Setting from "../../models/Setting";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Path} from "../../services/Path";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

export default function SettingView(props: {setting: Setting}) {
    const {setting} = props
    const { name } = useParams<{ name: string }>()
    const path = Path.Setting
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(path + name + '/edit')
    }

    const getName = (): string => {
        if (!setting) {
            return 'Setting'
        }
        console.log(setting)
        return setting.name
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={getName()}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <Grid item xs>
                            <Typography style={{ textAlign: 'center' }}>{'Magic'}</Typography>
                            <Divider />
                            <Typography style={{ textAlign: 'center' }}>
                                {setting?.magic!! ? <CheckIcon color='primary' fontSize='small' />: <CancelIcon color='primary' fontSize='small' />}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
