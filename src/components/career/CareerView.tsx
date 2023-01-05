import {Card, CardContent, CardHeader, Divider, IconButton} from "@mui/material";
import {Path} from "../../services/Path";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate, useParams} from "react-router-dom";
import Career from "../../models/actor/player/Career";


export default function CareerView(props: {career: Career}): JSX.Element {
    const {career} = props
    const { name } = useParams<{ name: string }>()
    let path = Path.Career
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
            </CardContent>
        </Card>
    )
}