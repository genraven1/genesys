import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {Box, List, ListItemText, Collapse, ListItemButton} from "@mui/material";
import React, { useState, Fragment, MouseEvent, KeyboardEvent } from "react";
import ListMenuItemDialog from "./ListMenuItemDialog";
import ListMenuItemLink from "./ListMenuItemLink";

export type Anchor = 'left'

interface ExpandedListItemProps {
    header: string
    viewTitle: string
    to: string
    dialogTitle: string
    onClick: () => void
}

export default function ExpandedList(props: ExpandedListItemProps) {
    const { header, viewTitle, to, dialogTitle, onClick } = props
    const [state, setState] = useState({ left: false })
    const [collapse, setCollapse] = useState(false)

    const handleCollapse = (event: MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation()
        setCollapse(!collapse)
    }

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
        if (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')) { return }
        setState({ ...state, [anchor]: open })
    }

    return (
        <Fragment>
            {(['left'] as const).map((anchor) => (
                <Box role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
                    <List>
                        <ListItemButton onClick={handleCollapse} color='primary'>
                            <ListItemText primary={header} />
                            {collapse ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={collapse} timeout="auto" unmountOnExit>
                            <List>
                                <ListMenuItemLink to={to} name={viewTitle} />
                                <ListMenuItemDialog name={dialogTitle} onClick={onClick} />
                            </List>
                        </Collapse>
                    </List>
                </Box>
            ))}
        </Fragment>
    )
}