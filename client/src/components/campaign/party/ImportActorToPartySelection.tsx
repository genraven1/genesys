import {Box, Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import ListMenuItemDialog from "../../navigation/ListMenuItemDialog";
import React, {useState} from "react";
import CreateActorDialog from "../../actor/common/CreateActorDialog";
import {ActorType} from "../../../models/actor/Actor";

interface Props {

}

export default function ImportActorToPartySelection(props: Props) {
    const [collapse, setCollapse] = useState(false)
    const [openPlayerImportDialog, setOpenPlayerImportDialog] = useState(false)

    return (
        <Box role="presentation">
            <List>
                <ListItemButton onClick={() => setCollapse(!collapse)} color='primary'>
                    <ListItemText primary={'Import Actor to Party'} />
                    {collapse ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={collapse} timeout="auto" unmountOnExit>
                    <List>
                        <ListMenuItemDialog name={'Import Player'} onClick={(): void => setOpenPlayerImportDialog(true)} />
                        {openPlayerImportDialog && <CreateActorDialog open={openPlayerImportDialog}
                                                                        onClose={(): void => setOpenPlayerImportDialog(false)}
                                                                        actorType={ActorType.Player}/>}
                    </List>
                </Collapse>
            </List>
        </Box>
    )
}