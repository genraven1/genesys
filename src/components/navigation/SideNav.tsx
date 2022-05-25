import {  Fragment, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import ListMenuItemLink from './ListMenuItemLink';
import ExpandedList, { Anchor } from './ExpandedList';
import TalentDialog from '../talents/TalentDialog';
import CreatePlayerDialog from '../actor/player/CreatePlayerDialog';
import CreateNonPlayerCharacterDialog from "../actor/npc/CreateNonPlayerCharacterDialog";
import {Path} from "../../services/Path";
import CreateSkillDialog from "../skills/CreateSkillDialog";

export default function SideNav() {
    const [state, setState] = useState({ left: false });
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false);
    const [openSkillCreationDialog, setOpenSkillCreationDialog] = useState(false);
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
                        <ExpandedList header={'Talents'} viewTitle={'View All Talents'} to={Path.Talent} dialogTitle={'Create Talent'} onClick={(): void => setOpenTalentCreationDialog(true)} />
                        <ExpandedList header={'Skills'} viewTitle={'View All Skills'} to={Path.Skills} dialogTitle={'Create Skill'} onClick={(): void => setOpenSkillCreationDialog(true)} />
                        <ExpandedList header={'Player Characters'} viewTitle={'View All Player Characters'} to={Path.Player} dialogTitle={'Create Player Character'} onClick={(): void => setOpenPlayerCreationDialog(true)} />
                        <ExpandedList header={'Non Player Characters'} viewTitle={'View All NPCS'} to={Path.Player} dialogTitle={'Create NPC'} onClick={(): void => setOpenNonPlayerCharacterCreationDialog(true)} />
                        {/*<ExpandedList name='Equipment' items={ EQUIPMENT } />*/}
                    </Drawer>
                    {openTalentCreationDialog && <TalentDialog open={openTalentCreationDialog} onClose={(): void => setOpenTalentCreationDialog(false)} />}
                    {openSkillCreationDialog && <CreateSkillDialog open={openSkillCreationDialog} onClose={(): void => setOpenSkillCreationDialog(false)} />}
                    {openPlayerCreationDialog && <CreatePlayerDialog open={openPlayerCreationDialog} onClose={(): void => setOpenPlayerCreationDialog(false)} />}
                    {openNonPlayerCharacterCreationDialog && <CreateNonPlayerCharacterDialog open={openNonPlayerCharacterCreationDialog} onClose={(): void => setOpenNonPlayerCharacterCreationDialog(false)} />}
                </Fragment>
            ))}
        </div>
    );
}
