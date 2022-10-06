import {useNavigate, useParams} from "react-router-dom";
import {Organization} from "../../../models/lore/Organization";
import {LorePath} from "../../../services/Path";
import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import OrganizationSidebar from "./OrganizationSidebar";

interface Props {
    organization: Organization
}

export default function OrganizationView(props: Props) {
    const {organization} = props
    const { name } = useParams<{ name: string }>()
    const path = LorePath.Organization
    let navigate = useNavigate()

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
                    <Grid container spacing={10}>
                        <Grid item xs={8}>

                        </Grid>
                        <Grid item xs={4}>
                            <OrganizationSidebar organization={organization} />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}