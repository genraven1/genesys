import React, {Fragment, KeyboardEvent, MouseEvent, useState} from "react";
import {Box, Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import ListMenuItemLink from "./ListMenuItemLink";

export type Anchor = 'up'

interface Props {
    header: string
    viewTitle: string
}

export default function ExpandedMenuList(props: Props): JSX.Element {
    const {header,viewTitle} = props
    const [state, setState] = useState({ up: false })
    const [collapse, setCollapse] = useState(false)

    const handleCollapse = (event: MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation()
        setCollapse(!collapse)
    }

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
        if (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')) { return }
        setState({ ...state, [anchor]: open })
    }

    return(
        <Fragment>
            <Box role="presentation" onClick={toggleDrawer('up', false)} onKeyDown={toggleDrawer('up', false)}>
                <List>
                    <ListItemButton onClick={handleCollapse}>
                        <ListItemText primary={header} />
                        {collapse ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={collapse} timeout="auto" unmountOnExit orientation="horizontal">
                        <List>
                            <ListMenuItemLink to={'to'} name={viewTitle} />
                        </List>
                    </Collapse>
                </List>
            </Box>
        </Fragment>
    )
}