import PreviewIcon from '@mui/icons-material/Preview'
import {Box, IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {Link, LinkProps, useLocation} from "react-router-dom";
import {forwardRef, useMemo} from "react";
import * as React from "react";

interface Props {
    name: string
}

export default function ActionsTableCell(props: Props): JSX.Element {
    const {name} = props
    const { pathname } = useLocation()

    const handleEdit = useMemo(() => forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref): React.ReactElement => (
        <Link to={`${pathname}${name}/edit`} ref={ref} {...itemProps} />
    )),[pathname, name])

    const handleView = useMemo(() => forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref): React.ReactElement => (
        <Link to={`${pathname}${name}/view`} ref={ref} {...itemProps} />
    )),[pathname, name])

    return  (
        <Box component='span'>
            <IconButton title='View' size='small' component={handleView}>
                <PreviewIcon color='primary' fontSize='small' />
            </IconButton>
            <IconButton title='Edit' size='small' component={handleEdit}>
                <EditIcon color='primary' fontSize='small' />
            </IconButton>
        </Box>
    )
}