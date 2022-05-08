import { Fragment, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import ListMenuItemLink, { MenuListItemProps } from './ListMenuItemLink';
import ExpandedList, { Anchor } from './ExpandedList';

const TALENTS: Array<MenuListItemProps> = [
    { to: 'talents/new', name: 'Create Talent' },
    { to: 'talents', name: 'View All Talents' },
];

const NPCS: Array<MenuListItemProps> = [
    { to: 'npcs/minions', name: 'View All Minions' },
    { to: 'npcs/minions/new', name: 'Create Minion' },
];

const EQUIPMENT: Array<MenuListItemProps> = [
    { to: 'equipment/armor', name: 'View All Armor' },
    { to: 'equipment/armor/new', name: 'Create Armor' },
];

export default function SideNav() {
    const [state, setState] = useState({ left: false });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {return;}
        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
            {(['left'] as const).map((anchor) => (
                <Fragment>
                    <IconButton onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        <ListMenuItemLink name='Home' to='' />
                        <ExpandedList name='Talents' items={ TALENTS } />
                        <ExpandedList name='Non-Player Characters' items={ NPCS } />
                        <ExpandedList name='Equipment' items={ EQUIPMENT } />
                    </Drawer>
                </Fragment>
            ))}
        </div>
    );
}
