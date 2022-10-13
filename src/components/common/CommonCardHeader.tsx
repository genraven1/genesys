import {Fragment} from "react";
import {CardHeader, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

interface Props {
    path: string
}

export function CommonCardHeader(props: Props): JSX.Element {
    const {path} = props
    const { name } = useParams<{ name?: string }>()
    const pathname = useLocation().pathname
    let navigate = useNavigate()

    const onView = () => {
        navigate(path + name + '/view');
    }

    const onEdit = () => {
        navigate(path + name + '/edit')
    }

    const renderCardHeader = (): JSX.Element => {
        if (pathname.endsWith('/view')) {
            return (
                <CardHeader
                    style={{textAlign: 'center'}}
                    title={name}
                    action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                        <EditIcon color='primary' fontSize='small' />
                    </IconButton>}>
                </CardHeader>
            )
        }
        else if (pathname.endsWith('/edit')) {
            return (
                <CardHeader
                    style={{textAlign: 'center'}}
                    title={name}
                    action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                        <EditIcon color='primary' fontSize='small' />
                    </IconButton>}>
                </CardHeader>
            )
        }
        else {return <Fragment/>}
    }

    return (
        <Fragment>
            {renderCardHeader()}
        </Fragment>
    )
}