import Skill from "../../models/actor/Skill";
import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {ViewFieldCard} from "../common/ViewFieldCard";
import {Path} from "../../services/Path";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate, useParams} from "react-router-dom";


export default function SkillView(props: {skill: Skill}): JSX.Element {
    const {skill} = props
    const { name } = useParams<{ name: string }>()
    let path = Path.Skills
    let navigate = useNavigate()

    const renderSkillActiveCard = (): JSX.Element => {
        if (skill?.active!!) {
            return <ViewFieldCard name={'Active Skill'} value={'True'} />
        }
        else {
            return <ViewFieldCard name={'Active Skill'} value={'False'} />
        }
    }

    const onEdit = () => {
        navigate(path + name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <ViewFieldCard name={'Skill Type'} value={skill?.type!!} />
                    <ViewFieldCard name={'Linked Characteristic'} value={skill?.characteristic!!} />
                    {renderSkillActiveCard()}
                </Grid>
            </CardContent>
        </Card>
    )
}