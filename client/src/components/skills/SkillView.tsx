import Skill from "../../models/actor/Skill";
import {Card, CardContent, CardHeader, Grid, IconButton} from "@mui/material";
import {ViewFieldCard} from "../common/ViewFieldCard";
import {RootPath} from "../../services/Path";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom";

interface Props {
    skill: Skill
}

export default function SkillView(props: Props) {
    const {skill} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(RootPath.Skills + skill.id + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={skill.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <ViewFieldCard name={'Skill Type'} value={skill.type} />
                    <ViewFieldCard name={'Linked Characteristic'} value={skill.characteristic} />
                </Grid>
            </CardContent>
        </Card>
    )
}