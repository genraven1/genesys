import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {ViewFieldCard, ViewQualityActivationCard} from "../common/ViewFieldCard";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Path} from "../../services/Path";
import EditIcon from "@mui/icons-material/Edit";
import Setting from "../../models/Setting";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import {Fragment} from "react";
import Quality from "../../models/Quality";

interface Props {
    quality: Quality
    allSettings: Setting[]
}

export default function QualityView(props: Props) {
    const {quality, allSettings} = props
    const {name} = useParams<{ name: string }>()
    const path = Path.Qualities
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(path + name + '/edit')
    }

    const renderSettings = ():JSX.Element => {
        if (quality?.settings!! === undefined) {return <Fragment/>}
        let settingList = []
        for (let setting of allSettings) {
            if (quality?.settings.includes(setting.name)) {
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
                title={quality?.name!!}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={quality?.description!!} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewQualityActivationCard quality={quality}/>
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
