import Player from "../../../../../models/actor/player/Player";
import React, {useState} from "react";
import {Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

interface Props {
    player: Player
}

export default function SpendExperienceMenuButton(props: Props) {
    const {player} = props;
    const [collapse, setCollapse] = useState(false);
    const [openCharacteristicDialog, setOpenCharacteristicDialog] = useState(false);

    return (
        <List>
            <ListItemButton onClick={() => setCollapse(!collapse)} color='primary'>
                <ListItemText primary={player.experience.available}/>
                {collapse ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={collapse} timeout="auto" unmountOnExit>
                <List>
                    <ListItemButton onClick={() => setOpenCharacteristicDialog(true)}>
                        <ListItemText primary={'Characteristic'}/>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary={'Skill'}/>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary={'Talent'}/>
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}