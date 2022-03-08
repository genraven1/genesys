import { forwardRef, Fragment, useMemo, useState } from 'react';
import { LinkProps, Link } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Collapse, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';

type Anchor = 'left';

interface ListItemProps {
    to: string,
    name: string,
}

function ListMenuItemLink(props: ListItemProps): JSX.Element {
    const { to, name } = props;

    const renderLink = useMemo(() => forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref): React.ReactElement => (
        <Link to={to} ref={ref} {...itemProps} />
    )),
        [to]);

    return (
        <List>
            <ListItem button component={renderLink}>
                <ListItemText primary={name} />
            </ListItem>
        </List>
    );
}

const TALENTS: Array<ListItemProps> = [
    {to: 'talents/new', name: 'Create Talent'},
    {to: 'talents', name: 'View All Talents'},
];

export default function SideNav() {
    const [state, setState] = useState({ left: false });
    const [collaspe, setCollaspe] = useState(false);

    const handleCollaspe = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
        setCollaspe(!collaspe);
    }

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor, primary: string, items: Array<ListItemProps>) => (
        <Box role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
            <List>
                <ListItem button onClick={handleCollaspe}>
                    <ListItemText primary={primary} />
                    {collaspe ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={collaspe} timeout="auto" unmountOnExit>
                    <List>
                        {items.map((item) => {return (<ListMenuItemLink to={item.to} name={item.name} />)})}
                    </List>
                </Collapse>
            </List>
        </Box>
    );

    return (
        <div>
            {(['left'] as const).map((anchor) => (
                <Fragment>
                    <IconButton onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        <ListMenuItemLink name='Home' to='' />
                        {list(anchor, "Talents", TALENTS)}
                    </Drawer>
                </Fragment>
            ))}
        </div>
    );
}
