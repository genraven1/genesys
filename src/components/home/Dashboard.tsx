import {LorePath, Path} from "../../services/Path";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import {Lore} from "../../models/lore/Lore";

export default function Dashboard(): JSX.Element {
    let navigate = useNavigate()

    const onClick = () => {
        navigate(Path.Lore)
    }
    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={'Dashboard'} />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Button color='primary' variant='contained' onClick={onClick}>Lore</Button>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Grid item xs>
                        <DashboardButton path={LorePath.Organization} title={Lore.ORGANIZATION} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

interface DashboardProps {
    path: LorePath
    title: string
}

function DashboardButton(props: DashboardProps): JSX.Element {
    let navigate = useNavigate()

    const onClick = () => {
        navigate(props.path)
    }

    return (
        <Button color='primary' variant='contained' onClick={onClick}>{props.title}</Button>
    )
}