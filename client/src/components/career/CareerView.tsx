import {Card, CardContent, CardHeader, Grid, IconButton} from '@mui/material';
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {Path} from "../../services/Path";
import EditIcon from "@mui/icons-material/Edit";
import ViewSkillsCard from "../common/skill/ViewSkillsCard";
import Career from '../../models/actor/player/Career';

interface Props {
    career: Career
}

export default function CareerView(props: Props) {
    const {career} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(Path.Career + career.name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={career.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <ViewSkillsCard skills={career.skills}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
