import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {ViewFieldCard} from "../common/ViewFieldCard";
import Talent from "../../models/Talent";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Path} from "../../services/Path";
import EditIcon from "@mui/icons-material/Edit";
import Setting from "../../models/Setting";
import {Fragment, useEffect, useState} from "react";
import ViewSettingsCard from "../common/setting/ViewSettingsCard";
import TalentService from "../../services/TalentService";
import {useFetchAllSettings} from "../setting/SettingWorkflow";

interface Props {
    allSettings: Setting[]
}

export default function TalentView() {
    // const {allSettings} = props
    const allSettings = useFetchAllSettings();
    const [talent, setTalent] = useState<Talent>()
    const { name } = useParams();
    const path = Path.Talent
    let navigate = useNavigate()

    const getTalent = (name: string) => {
        TalentService.getTalent(name).then(tal => {
            setTalent(tal)
        })
    }

    useEffect(() => {
        if (name) {
            console.log(name)
            getTalent(name)
            console.log(talent)
        }
    }, [name])

    const onEdit = () => {
        navigate(path + name + '/edit')
    }

    const renderRanked = (): JSX.Element => {
        if (talent?.ranked!! === undefined) {
            return <Fragment/>
        }
        let ranked: string
        if (talent?.ranked!!) {
            ranked = 'Yes'
        } else {
            ranked = 'No'
        }
        return <ViewFieldCard name={'Ranked'} value={ranked}/>
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={talent?.name!}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <ViewFieldCard name={'Description'} value={talent?.description!!}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={2}>
                        {renderRanked()}
                        <ViewFieldCard name={'Activation'} value={talent?.activation!!}/>
                        <ViewFieldCard name={'Tier'} value={talent?.tier!!}/>
                    </Grid>
                </Grid>
                <ViewSettingsCard settings={talent?.settings!!} allSettings={allSettings}/>
            </CardContent>
        </Card>
    )
}
