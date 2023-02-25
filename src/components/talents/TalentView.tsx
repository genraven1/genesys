import {Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography} from '@mui/material';
import {ViewFieldCard} from "../common/ViewFieldCard";
import Talent from "../../models/Talent";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Path} from "../../services/Path";
import EditIcon from "@mui/icons-material/Edit";
import Setting from "../../models/Setting";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import {Fragment, useEffect, useState} from "react";
import SettingService from "../../services/SettingService";

export default function TalentView(props: {talent: Talent}) {
    const {talent} = props
    const {id} = useParams<{ id: string }>()
    const path = Path.Talent
    let navigate = useNavigate()
    const [settings, setSettings] = useState<Setting[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            if (settings.length > 0) {return}
            const settingList = await SettingService.getSettings()
            if (!settingList) {return}
            setSettings(settingList)
        })()
    }, [settings.length, setSettings])

    const onEdit = () => {
        navigate(path + id + '/edit')
    }

    const renderSettings = ():JSX.Element => {
        if (talent?.settings!! === undefined) {
            return <Fragment/>
        }
        let settingList = []
        for (let setting of settings) {
            if (talent?.settings.includes(setting.id)) {
                settingList.push(setting)
            }
        }
        return (
            <Fragment>
                {(settingList || []).map((setting: Setting):JSX.Element => {
                    return <GenesysDescriptionTypography text={setting?.name!!}/>
                })}
            </Fragment>
        )
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={talent?.name!!}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={talent?.description!!} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Ranked'} value={talent?.ranked!!} />
                        <ViewFieldCard name={'Activation'} value={talent?.activation!!} />
                        <ViewFieldCard name={'Tier'} value={talent?.tier!!} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <Grid item xs>
                            <Card>
                                <CardHeader title={'Settings'} style={{ textAlign: 'center' }} />
                                <Divider />
                                <CardContent>
                                    {renderSettings()}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
