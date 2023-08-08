import {Button, Dialog, DialogActions, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import Player from "../../../models/actor/player/Player";
import ActorService from "../../../services/ActorService";
import {ActorPath} from "../../../services/Path";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CreatePlayerDialog(props: Props) {
    const {open, onClose} = props
    const [name, setName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let player = {} as Player
        player = {...await ActorService.createPlayer(name)}
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
                <Button color='primary' variant='contained' onClick={handleCreate}>CREATE</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}
