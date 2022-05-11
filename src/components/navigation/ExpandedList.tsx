import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { useState, Fragment } from "react";
import ListMenuItemDialog from "./ListMenuItemDialog";
import ListMenuItemLink from "./ListMenuItemLink";

export type Anchor = 'left';

interface ExpandedListItemProps {
    header: string,
    viewTitle: string,
    to: string,
    dialogTitle: string,
    onClick: () => void
}

export default function ExpandedList(props: ExpandedListItemProps) {
    const { header, viewTitle, to, dialogTitle, onClick } = props;
    const [state, setState] = useState({ left: false });
    const [collaspe, setCollaspe] = useState(false);

    const handleCollaspe = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
        setCollaspe(!collaspe);
    }

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) { return; }
        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
            {(['left'] as const).map((anchor) => (
                <Fragment>
                    <Box role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
                        <List>
                            <ListItem button onClick={handleCollaspe}>
                                <ListItemText primary={header} />
                                {collaspe ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={collaspe} timeout="auto" unmountOnExit>
                                <List>
                                    <ListMenuItemLink to={to} name={viewTitle} />
                                    <ListMenuItemDialog name={dialogTitle} onClick={onClick} />
                                </List>
                            </Collapse>
                        </List>
                    </Box>
                </Fragment>
            ))}
        </div>
    )
}