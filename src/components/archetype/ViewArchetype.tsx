import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {ViewNumberFieldCard} from "../common/ViewFieldCard";
import {Path} from "../../services/Path";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate, useParams} from "react-router-dom";
import ViewSettingsCard from "../common/setting/ViewSettingsCard";
import Setting from "../../models/Setting";
import Archetype from "../../models/actor/player/Archetype";
import ArchetypeAbilityCard from "./ability/ArchetypeAbilityCard";

interface Props {
    archetype: Archetype
    settings: Setting[]
}

export default function ArchetypeView(props: Props): JSX.Element {
    const {archetype, settings} = props
    const {name} = useParams<{ name: string }>()
    let path = Path.Archetype
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(path + name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={archetype?.name!!}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <ViewNumberFieldCard name={'Brawn'} value={archetype?.brawn!!} />
                    <ViewNumberFieldCard name={'Agility'} value={archetype?.agility!!} />
                    <ViewNumberFieldCard name={'Intellect'} value={archetype?.intellect!!} />
                    <ViewNumberFieldCard name={'Cunning'} value={archetype?.cunning!!} />
                    <ViewNumberFieldCard name={'Willpower'} value={archetype?.willpower!!} />
                    <ViewNumberFieldCard name={'Presence'} value={archetype?.presence!!} />
                </Grid>
                <Divider/>
                <Grid container justifyContent={'center'}>
                    <ViewNumberFieldCard name={'Wounds'} value={archetype?.wounds!!} />
                    <ViewNumberFieldCard name={'Strain'} value={archetype?.strain!!} />
                    <ViewNumberFieldCard name={'Experience'} value={archetype?.experience!!} />
                </Grid>
                <Divider/>
                <ArchetypeAbilityCard archetype={archetype!!}/>
                <Divider/>
                {/*<ViewFieldCard name={'Linked Characteristic'} value={archetype?.skills!!} />*/}
                <ViewSettingsCard settingNames={archetype?.settings!!} allSettings={settings}/>
            </CardContent>
        </Card>
    )
}