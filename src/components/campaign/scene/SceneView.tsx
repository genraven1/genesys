import {useNavigate} from "react-router-dom";
import {CampaignPath} from "../../../services/Path";
import {Card, CardContent, CardHeader, Grid, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import Scene from "../../../models/campaign/Scene";

interface Props {
    scene: Scene
    campaignName: string,
    sessionName: string,
}

export default function SceneView(props: Props): JSX.Element {
    const {scene, campaignName, sessionName} = props
    const path = CampaignPath.Campaign + campaignName + CampaignPath.Session + sessionName + CampaignPath.Scene
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(path + scene.name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={scene.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
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