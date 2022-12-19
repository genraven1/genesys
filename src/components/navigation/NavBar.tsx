import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SideNav from './SideNav';
import {Button} from "@mui/material";
import * as React from "react";
import CustomRollDialog from "../roll/CustomRollDialog";
import {useState} from "react";

export default function ButtonAppBar() {
    const [openCustomRollBackDrop, setOpenCustomRollBackDrop] = useState(false)

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
                <SideNav />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>GENESYS</Typography>
                <Button color='primary' variant='contained' onClick={(): void => setOpenCustomRollBackDrop(true)}>Roll</Button>
                {openCustomRollBackDrop && <CustomRollDialog open={openCustomRollBackDrop} onClose={(): void => setOpenCustomRollBackDrop(false)}/>}
            </Toolbar>
          </AppBar>
        </Box>
      )
}