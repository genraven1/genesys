import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { useState, Fragment } from "react";
import ListMenuItemLink, { MenuListItemProps } from "./ListMenuItemLink";

export type Anchor = 'left';

export interface ExpandedListItemProps {
    name: string,
    items : Array<MenuListItemProps>,
}

export default function ExpandedList(props: ExpandedListItemProps) {
    const [state, setState] = useState({ left: false });
    const [collaspe, setCollaspe] = useState(false);

    const handleCollaspe = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
        setCollaspe(!collaspe);
    }

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {return;}
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor, primary: string, items: Array<MenuListItemProps>) => (
        <Box role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
            <List>
                <ListItem button onClick={handleCollaspe}>
                    <ListItemText primary={primary} />
                    {collaspe ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={collaspe} timeout="auto" unmountOnExit>
                    <List>
                        {items.map((item) => { return (<ListMenuItemLink to={item.to} name={item.name} />) })}
                    </List>
                </Collapse>
            </List>
        </Box>
    );

    return (
        <div>
            {(['left'] as const).map((anchor) => (
                <Fragment>
                    {list(anchor, props.name, props.items)}
                </Fragment>
            ))}
        </div>
    )
}