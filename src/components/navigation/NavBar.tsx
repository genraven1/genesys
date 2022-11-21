import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SideNav from './SideNav';
import {Button} from "@mui/material";
import * as React from "react";
import CustomRollBackdrop from "../roll/CustomRollBackdrop";
import {useState} from "react";
import RollService from "../../services/RollService";
import Roll from "../../models/Roll";

export default function ButtonAppBar() {
    const [openCustomRollBackDrop, setOpenCustomRollBackDrop] = useState(false)

    const onRoll = async () => {
        let roll: Roll = {
            boost: 3,
            ability: 2,
            proficiency: 0,
            setback: 0,
            difficulty: 0,
            challenge: 0,
            success: 0,
            advantage: 0,
            triumph: 0,
            failure: 0,
            threat: 0,
            despair: 0
        }
        console.log(await RollService.roll(roll))
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
                <SideNav />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>GENESYS</Typography>
                <Button color='primary' variant='contained' onClick={onRoll}>Roll</Button>
                {/*<Button color='primary' variant='contained' onClick={(): void => setOpenCustomRollBackDrop(true)}>Roll</Button>*/}
                {/*{openCustomRollBackDrop && <CustomRollBackdrop open={openCustomRollBackDrop} onClose={(): void => setOpenCustomRollBackDrop(false)}/>}*/}
            </Toolbar>
          </AppBar>
        </Box>
      )
}