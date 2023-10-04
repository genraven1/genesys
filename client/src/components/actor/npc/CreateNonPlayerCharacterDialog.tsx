import {Button, Dialog, DialogActions, DialogContentText, DialogTitle, Divider, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import ActorService from "../../../services/ActorService";
import {ActorPath} from "../../../services/Path";
import {ActorType} from "../../../models/actor/Actor";
import InputSelectField, {Option} from "../../common/InputSelectField";
import Nemesis from "../../../models/actor/npc/Nemesis";
import Minion from "../../../models/actor/npc/Minion";
import Rival from "../../../models/actor/npc/Rival";
import NonPlayerCharacter from "../../../models/actor/npc/NonPlayerCharacter";

interface Props {
    open: boolean
    onClose: () => void
}

const getActorTypes = (): Option[] => {
    return Object.values(ActorType).map((value) => ({value}))
}

export default function CreateNonPlayerCharacterDialog(props: Props) {
    const {open, onClose} = props
    const [name, setName] = useState('')
    const [type, setType] = useState<ActorType>(ActorType.Minion)
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let copyActor = {} as NonPlayerCharacter
        switch (type) {
            case ActorType.Minion:
                copyActor = {...await ActorService.createMinion(name)}
                copyActor.type = type
                await ActorService.updateMinion(name, copyActor as Minion)
                navigate(ActorPath.Minion + name + '/edit')
                break
            case ActorType.Rival:
                copyActor = {...await ActorService.createRival(name)}
                copyActor.type = type
                await ActorService.updateRival(name, copyActor as Rival)
                navigate(ActorPath.Rival + name + '/edit')
                break
            case ActorType.Nemesis:
                copyActor = {...await ActorService.createNemesis(name)}
                copyActor.type = type
                await ActorService.updateNemesis(name, copyActor as Nemesis)
                navigate(ActorPath.Nemesis + name + '/edit')
                break
            case ActorType.Player:
                break
        }
        onClose()
    }

    const onTypeChange = (value: ActorType): void => {
        setType(value)
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target
        setName(value)
    }

    const getTitle = (): string => {
        return 'Create ' + type
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required/>
                <Divider/>
                <InputSelectField defaultValue={ActorType.Minion} options={getActorTypes()}
                                  onCommit={(value: string) => {
                                      onTypeChange(value as ActorType)
                                  }}/>
            </DialogContentText>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={handleCreate}>CREATE</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}
