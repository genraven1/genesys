import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton} from "@mui/material";
import {Characteristic} from "../../../../../../models/actor/Characteristic";
import Typography from "@mui/material/Typography";
import {Add} from "@mui/icons-material";
import {useState} from "react";
import Player from "../../../../../../models/actor/player/Player";
import PlayerService from "../../../../../../services/actor/PlayerService";

interface Props {
    open: boolean
    onCLose: () => void
    currentPlayer: Player
}

export default function SpendCharacteristicDialog(props: Props) {
    const {open, onCLose, currentPlayer} = props;
    const [xp, setXp] = useState(0);
    const [player, setPlayer] = useState(currentPlayer);

    const calculateRequiredXp = (level: number) => {
        return (level + 1) * 10;
    };

    const handleIncreaseLevel = async (characteristic: Characteristic) => {
        const newXp = xp + calculateRequiredXp(characteristic.current);
        if (newXp <= player.experience.available) {
            setPlayer(await PlayerService.purchaseCharacteristicUpgrade(player.id, characteristic))
        }
    };

    const characteristics: Characteristic[] = [
        {type: 'Characteristic1', current: 1},
        {type: 'Characteristic2', current: 2},
        {type: 'Characteristic3', current: 3},
        // Add more characteristics as needed
    ];

    const handleCancel = async () => {
        await PlayerService.updatePlayerArchetype(player.id, player.archetype);
        onCLose();
    };

    return (
        <Dialog open={open} onClose={onCLose}>
            <DialogTitle>Spend Experience on Characteristic</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {characteristics.map((characteristic, index) => (
                        <Grid item xs={12} key={index}>
                            <Typography variant="h6">{characteristic.type} (Value {characteristic.current})</Typography>
                            <IconButton
                                onClick={() => handleIncreaseLevel(characteristic)}
                                color="primary"
                                disabled={xp + calculateRequiredXp(characteristic.current) > availableXp}>
                                <Add/>
                            </IconButton>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel()} color="primary">Cancel</Button>
                <Button
                    onClick={() => onCLose}
                    color="primary"
                    disabled={xp === 0 || xp > availableXp}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
