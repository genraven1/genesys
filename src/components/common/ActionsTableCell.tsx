import PreviewIcon from '@mui/icons-material/Preview'
import {Box, IconButton, TableCell} from "@mui/material";
import {Link, LinkProps, useLocation} from "react-router-dom";
import {forwardRef, useMemo} from "react";
import * as React from "react";

interface Props {
    name: string
}

export default function ActionsTableCell(props: Props): JSX.Element {
    const {name} = props
    const { pathname } = useLocation()

    const handleView = useMemo(() => forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref): React.ReactElement => (
        <Link to={`${pathname}${name}/view`} ref={ref} {...itemProps} />
    )),[pathname, name])

    return  (
        <TableCell>
            <Box component='span'>
                <IconButton title='View' size='small' component={handleView}>
                    <PreviewIcon color='primary' fontSize='small' />
                </IconButton>
            </Box>
        </TableCell>
    )
}