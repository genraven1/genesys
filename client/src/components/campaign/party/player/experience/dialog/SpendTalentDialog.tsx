import Player from "../../../../../../models/actor/player/Player";
import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton} from "@mui/material";
import * as React from "react";
import PlayerService from "../../../../../../services/actor/PlayerService";

interface Props {
    open: boolean
    onClose: () => void
    currentPlayer: Player
}

export default function SpendTalentDialog(props: Props) {
    const {open, onClose, currentPlayer} = props;
    const [player, setPlayer] = useState(currentPlayer);

    useEffect(() => {
        setPlayer(currentPlayer);
    }, [currentPlayer]);

    const handleCancel = async () => {
        setPlayer(await PlayerService.updatePlayer(currentPlayer));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle>Spend Experience on Talent</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} columns={5}>

                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose} color="primary">Confirm</Button>
                <Button onClick={handleCancel} color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}