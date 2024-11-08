import {Dialog, DialogContentText, DialogTitle, Divider, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import ActorService from "../../../services/ActorService";
import {ActorPath} from "../../../services/RootPath";
import {ActorType, getActorTypes} from "../../../models/actor/Actor";
import InputSelectField from "../../common/InputSelectField";
import {GenesysDialogActions} from "../../common/dialog/GenesysDialogActions";
import {useFetchCurrentCampaign} from "../../campaign/CampaignWorkflow";

interface Props {
    open: boolean
    actorType: ActorType
    onClose: () => void
}

export default function CreateActorDialog(props: Props) {
    const {open, actorType, onClose} = props;
    const [name, setName] = useState('');
    const [type, setType] = useState<ActorType>(actorType);
    let navigate = useNavigate();
    let campaign = useFetchCurrentCampaign();

    const handleCreate = async (): Promise<void> => {
        switch (type) {
            case ActorType.Minion:
                let minion = await ActorService.createMinion(campaign.id, name);
                navigate(ActorPath.Minion + minion.id + '/edit');
                break
            case ActorType.Rival:
                let rival = await ActorService.createRival(campaign.id, name);
                navigate(ActorPath.Rival + rival.id + '/edit');
                break
            case ActorType.Nemesis:
                let nemesis = await ActorService.createNemesis(campaign.id, name);
                navigate(ActorPath.Nemesis + nemesis.id + '/edit');
                break
            case ActorType.Player:
                let player = await ActorService.createPlayer(campaign.id, name);
                navigate(ActorPath.Player + player.id + '/edit');
                break
        }
        onClose();
    }

    const onTypeChange = (value: ActorType): void => {
        setType(value);
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        setName(value);
    }

    const getTitle = (): string => {
        return 'Create ' + type;
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required/>
                <Divider/>
                <InputSelectField defaultValue={type} options={getActorTypes()}
                                  onCommit={(value: string) => {
                                      onTypeChange(value as ActorType)
                                  }}/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    );
}
