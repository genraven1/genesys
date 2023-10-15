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

    const setActorDefaults = (npc: NonPlayerCharacter): NonPlayerCharacter => {
        npc.brawn = 1;
        npc.agility = 1;
        npc.intellect = 1;
        npc.cunning = 1;
        npc.willpower = 1;
        npc.presence = 1;
        npc.wounds = 1;
        npc.combat = 1;
        npc.social = 1;
        npc.general = 1;
        npc.soak = npc.brawn;
        npc.melee = 0;
        npc.ranged = 0;
        return npc;
    }

    const handleCreate = async (): Promise<void> => {
        let copyActor = {} as NonPlayerCharacter
        switch (type) {
            case ActorType.Minion:
                copyActor = {...await ActorService.createMinion(name)}
                copyActor.type = type
                const minion = setActorDefaults(copyActor) as Minion
                console.log(minion)
                await ActorService.updateMinion(copyActor.id, minion)
                navigate(ActorPath.Minion + copyActor.id + '/edit')
                break
            case ActorType.Rival:
                copyActor = {...await ActorService.createRival(name)}
                copyActor.type = type
                const rival = setActorDefaults(copyActor) as Rival
                await ActorService.updateRival(name, rival)
                navigate(ActorPath.Rival + name + '/edit')
                break
            case ActorType.Nemesis:
                copyActor = {...await ActorService.createNemesis(name)}
                copyActor.type = type
                const nemesis = setActorDefaults(copyActor) as Nemesis
                nemesis.strain = 1;
                await ActorService.updateNemesis(name, nemesis)
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
