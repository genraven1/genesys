import Skill from "../../models/actor/Skill";
import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {ViewFieldCard} from "../common/ViewFieldCard";
import {Path} from "../../services/Path";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate, useParams} from "react-router-dom";
import ViewSettingsCard from "../common/setting/ViewSettingsCard";
import Setting from "../../models/Setting";

interface Props {
    skill: Skill
    settings: Setting[]
}

export default function SkillView(props: Props): JSX.Element {
    const {skill, settings} = props
    const {name} = useParams<{ name: string }>()
    let path = Path.Skills
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(path + name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={skill?.name!!}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <ViewFieldCard name={'Skill Type'} value={skill?.type!!} />
                    <ViewFieldCard name={'Linked Characteristic'} value={skill?.characteristic!!} />
                </Grid>
                <ViewSettingsCard settingNames={skill?.settings!!} allSettings={settings}/>
            </CardContent>
        </Card>
    )
}