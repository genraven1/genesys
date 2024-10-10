import {Dialog, DialogActions, DialogContentText, DialogTitle} from "@mui/material";
import InputNumberRangeSelectField from "../../../common/InputNumberRangeSelect";
import ActorService from "../../../../services/ActorService";
import Player, {PlayerSkill} from "../../../../models/actor/player/Player";

interface Props {
    open: boolean
    player: Player
    playerSkill: PlayerSkill
    onClose: () => void
}

export default function PlayerEditSkillDialog(props: Props) {
    const { open, playerSkill, player, onClose } = props

    const handleEdit = async (ranks: number): Promise<void> => {
        player.skills.forEach((skill, index) => {
            if (skill.name === playerSkill.name) {
                skill.ranks = ranks
                player.skills[index] = skill
            }
        })
        await ActorService.updatePlayer(player)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{playerSkill.name}</DialogTitle>
            <DialogContentText style={{ textAlign: 'center' }}>{playerSkill.ranks}</DialogContentText>
            <DialogActions>
                <InputNumberRangeSelectField defaultValue={playerSkill.ranks} min={0} max={6} onCommit={handleEdit} />
            </DialogActions>
        </Dialog>
    )
}