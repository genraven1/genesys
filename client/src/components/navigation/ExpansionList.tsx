import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {Box, List, ListItemText, Collapse, ListItemButton} from "@mui/material";
import React, {useState} from "react";
import ListMenuItemDialog from "./ListMenuItemDialog";
import ListMenuItemLink from "./ListMenuItemLink";

interface Props {
    header: string
    viewTitle: string
    to: string
    dialogTitle: string
    onClick: () => void
}

export default function ExpansionList(props: Props) {
    const {header,viewTitle,to,dialogTitle,onClick} = props
    const [collapse, setCollapse] = useState(false)

    return (
        <Box role="presentation">
            <List>
                <ListItemButton onClick={() => setCollapse(!collapse)} color='primary'>
                    <ListItemText primary={header} />
                    {collapse ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={collapse} timeout="auto" unmountOnExit>
                    <List>
                        <ListMenuItemLink  name={viewTitle} to={to}/>
                        <ListMenuItemDialog name={dialogTitle} onClick={onClick} />
                    </List>
                </Collapse>
            </List>
        </Box>
    )
}