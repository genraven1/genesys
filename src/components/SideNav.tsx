import { forwardRef, Fragment, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { LinkProps, Link } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';

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

export default function TemporaryDrawer() {
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

    const list = (anchor: Anchor) => (
        <Box role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
            <List>
                <ListMenuItemLink name='Home' to='' />
                <ListItem button onClick={handleCollaspe}>
                    <ListItemText primary="Talents" />
                    {collaspe ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={collaspe} timeout="auto" unmountOnExit>
                    <List>
                        <ListMenuItemLink to={'talents'} name={'View All Talents'} />
                    </List>
                </Collapse>
            </List>
        </Box>
    );

    return (
        <div>
            {(['left'] as const).map((anchor) => (
                <Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </Fragment>
            ))}
        </div>
    );
}
