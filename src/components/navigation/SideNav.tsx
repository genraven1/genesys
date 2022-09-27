import {Fragment, useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {Drawer, IconButton} from '@mui/material';
import ListMenuItemLink from './ListMenuItemLink';
import ExpandedList, {Anchor} from './ExpandedList';
import TalentDialog from '../talents/TalentDialog';
import CreatePlayerDialog from '../actor/player/CreatePlayerDialog';
import CreateNonPlayerCharacterDialog from "../actor/npc/CreateNonPlayerCharacterDialog";
import {Path} from "../../services/Path";
import CreateSkillDialog from "../skills/CreateSkillDialog";
import {NonPlayerCharacterType} from "../../models/actor/npc/NonPlayerCharacter";
import CreateEquipmentDialog from "../equipment/CreateEquipmentDialog";
import {EquipmentType} from "../../models/equipment/Equipment";

export default function SideNav() {
    const [state, setState] = useState({ left: false });
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false);
    const [openSkillCreationDialog, setOpenSkillCreationDialog] = useState(false);
    const [openEquipmentCreationDialog, setOpenEquipmentCreationDialog] = useState(false);
    const [openPlayerCreationDialog, setOpenPlayerCreationDialog] = useState(false);
    const [openNemesisCreationDialog, setOpenNemesisCreationDialog] = useState(false);
    const [openRivalCreationDialog, setOpenRivalCreationDialog] = useState(false);

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
                        <ListMenuItemLink name='Home' to={Path.Home} />
                        <ExpandedList header={'Talents'} viewTitle={'View All Talents'} to={Path.Talent} dialogTitle={'Create Talent'} onClick={(): void => setOpenTalentCreationDialog(true)} />
                        <ExpandedList header={'Skills'} viewTitle={'View All Skills'} to={Path.Skills} dialogTitle={'Create Skill'} onClick={(): void => setOpenSkillCreationDialog(true)} />
                        <ExpandedList header={'Armor'} viewTitle={'View All Armor'} to={Path.Armor} dialogTitle={'Create Armor'} onClick={(): void => setOpenEquipmentCreationDialog(true)} />
                        <ExpandedList header={'Player Characters'} viewTitle={'View All Player Characters'} to={Path.Player} dialogTitle={'Create Player Character'} onClick={(): void => setOpenPlayerCreationDialog(true)} />
                        <ExpandedList header={'Nemesis NPCS'} viewTitle={'View All Nemeses'} to={Path.Nemesis} dialogTitle={'Create Nemesis'} onClick={(): void => setOpenNemesisCreationDialog(true)} />
                        <ExpandedList header={'Rival NPCS'} viewTitle={'View All Rivals'} to={Path.Rival} dialogTitle={'Create Rival'} onClick={(): void => setOpenRivalCreationDialog(true)} />
                    </Drawer>
                    {openTalentCreationDialog && <TalentDialog open={openTalentCreationDialog} onClose={(): void => setOpenTalentCreationDialog(false)} />}
                    {openSkillCreationDialog && <CreateSkillDialog open={openSkillCreationDialog} onClose={(): void => setOpenSkillCreationDialog(false)} />}
                    {openEquipmentCreationDialog && <CreateEquipmentDialog open={openEquipmentCreationDialog} onClose={(): void => setOpenEquipmentCreationDialog(false)} type={EquipmentType.Armor}/>}
                    {openPlayerCreationDialog && <CreatePlayerDialog open={openPlayerCreationDialog} onClose={(): void => setOpenPlayerCreationDialog(false)} />}
                    {openNemesisCreationDialog && <CreateNonPlayerCharacterDialog open={openNemesisCreationDialog} onClose={(): void => setOpenNemesisCreationDialog(false)}  type={NonPlayerCharacterType.Nemesis}/>}
                    {openRivalCreationDialog && <CreateNonPlayerCharacterDialog open={openRivalCreationDialog} onClose={(): void => setOpenRivalCreationDialog(false)}  type={NonPlayerCharacterType.Rival}/>}
                </Fragment>
            ))}
        </div>
    );
}
