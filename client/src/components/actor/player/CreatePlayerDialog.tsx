import {Button, Dialog, DialogActions, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import Player from "../../../models/actor/player/Player";
import ActorService from "../../../services/ActorService";
import {ActorPath} from "../../../services/Path";
import SkillService from "../../../services/SkillService";
import SettingService from "../../../services/SettingService";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CreatePlayerDialog(props: Props) {
    const {open, onClose} = props
    const [name, setName] = useState('')
    let navigate = useNavigate()

    const useHandleCreate = async (): Promise<void> => {
        let player = {} as Player
        player = {...await ActorService.createPlayer(name)}
        let currentSetting = await SettingService.getCurrentSetting()
        player.settings.push(currentSetting)
        let skills = await SkillService.getSkills()
        skills = skills.sort((a, b) => a.name.localeCompare(b.name))
        skills.forEach((skill, index) => {
            skill.settings.forEach((setting, index) => {
                if (setting.name === currentSetting.name) {
                    player.skills.push({career: false, ranks: 0, ...skill})
                }
            })
        })
        await ActorService.updatePlayer(name, player)
        navigate(ActorPath.Player + name + '/edit')
        onClose()
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{'Create Player'}</DialogTitle>
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required/>
            </DialogContentText>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={useHandleCreate}>CREATE</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}
