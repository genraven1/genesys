import {  Fragment, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import ListMenuItemLink from './ListMenuItemLink';
import ExpandedList, { Anchor } from './ExpandedList';
import TalentDialog from '../talents/TalentDialog';
import CreatePlayerDialog from '../actor/player/CreatePlayerDialog';
import {ActorPath} from "../../services/ActorService";
import CreateNonPlayerCharacterDialog from "../actor/npc/CreateNonPlayerCharacterDialog";

export default function SideNav() {
    const [state, setState] = useState({ left: false });
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false);
    const [openPlayerCreationDialog, setOpenPlayerCreationDialog] = useState(false);
    const [openNonPlayerCharacterCreationDialog, setOpenNonPlayerCharacterCreationDialog] = useState(false);

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) { return; }
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
                        <ExpandedList header={'Talents'} viewTitle={'View All Talents'} to={'talents'} dialogTitle={'Create Talent'} onClick={(): void => setOpenTalentCreationDialog(true)} />
                        <ExpandedList header={'Player Characters'} viewTitle={'View All Player Characters'} to={ActorPath.Player} dialogTitle={'Create Player Character'} onClick={(): void => setOpenPlayerCreationDialog(true)} />
                        <ExpandedList header={'Non Player Characters'} viewTitle={'View All NPCS'} to={ActorPath.Player} dialogTitle={'Create NPC'} onClick={(): void => setOpenNonPlayerCharacterCreationDialog(true)} />
                        {/*<ExpandedList name='Equipment' items={ EQUIPMENT } />*/}
                    </Drawer>
                    {openTalentCreationDialog && <TalentDialog open={openTalentCreationDialog} onClose={(): void => setOpenTalentCreationDialog(false)} />}
                    {openPlayerCreationDialog && <CreatePlayerDialog open={openPlayerCreationDialog} onClose={(): void => setOpenPlayerCreationDialog(false)} />}
                    {openNonPlayerCharacterCreationDialog && <CreateNonPlayerCharacterDialog open={openNonPlayerCharacterCreationDialog} onClose={(): void => setOpenNonPlayerCharacterCreationDialog(false)} />}
                </Fragment>
            ))}
        </div>
    );
}
