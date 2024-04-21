import {useNavigate, useParams} from "react-router-dom";
import {Path} from "../../../services/Path";
import {Card, CardContent, CardHeader, Grid, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import Scene from "../../../models/campaign/Scene";

interface Props {
    scene: Scene
}

export default function SceneView(props: Props): JSX.Element {
    const {scene} = props
    const { id } = useParams<{ id: string }>()
    const path = Path.Scene
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(path + id + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={scene?.name!!}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <Grid item xs>

                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}