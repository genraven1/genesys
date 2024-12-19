import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton} from "@mui/material";
import {Characteristic} from "../../../../../../models/actor/Characteristic";
import Typography from "@mui/material/Typography";
import {Add} from "@mui/icons-material";
import {useEffect, useState} from "react";
import Player from "../../../../../../models/actor/player/Player";
import PlayerService from "../../../../../../services/actor/PlayerService";

interface Props {
    open: boolean
    onClose: () => void
    currentPlayer: Player
}

export default function SpendCharacteristicDialog(props: Props) {
    const {open, onClose, currentPlayer} = props;
    const [player, setPlayer] = useState(currentPlayer);

    useEffect(() => {
        setPlayer(currentPlayer);
    }, [currentPlayer]);

    const handleIncreaseLevel = async (characteristic: Characteristic) => {
        setPlayer(await PlayerService.purchaseCharacteristicUpgrade(player.id, characteristic))
    };

    const characteristics: Characteristic[] = [
        {type: player.brawn.type, current: player.brawn.current},
        {type: player.agility.type, current: player.agility.current},
        {type: player.intellect.type, current: player.intellect.current},
        {type: player.cunning.type, current: player.cunning.current},
        {type: player.willpower.type, current: player.willpower.current},
        {type: player.presence.type, current: player.presence.current},
    ];

    const handleCancel = async () => {
        await PlayerService.updatePlayerArchetype(player.id, player.archetype);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Spend Experience on Characteristic</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {characteristics.map((characteristic, index) => (
                        <Grid item xs={12} key={index}>
                            <Typography variant="h6">{characteristic.type} (Value {characteristic.current})</Typography>
                            <IconButton
                                onClick={() => handleIncreaseLevel(characteristic)}
                                color="primary">
                                <Add/>
                            </IconButton>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose} color="primary">Confirm</Button>
                <Button onClick={handleCancel} color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
