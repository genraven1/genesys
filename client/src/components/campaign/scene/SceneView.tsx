import {useNavigate, useParams} from "react-router-dom";
import {CampaignPath, Path} from "../../../services/Path";
import {Card, CardContent, CardHeader, Grid, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import Scene from "../../../models/campaign/Scene";

interface Props {
    scene: Scene
}

export default function SceneView(props: Props): JSX.Element {
    const {scene} = props
    const path = CampaignPath.Scene
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(path + "" + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={""}
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