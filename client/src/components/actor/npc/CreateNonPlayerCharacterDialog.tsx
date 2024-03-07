import {Dialog, DialogContentText, DialogTitle, Divider, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import ActorService from "../../../services/ActorService";
import {ActorPath} from "../../../services/Path";
import {ActorType} from "../../../models/actor/Actor";
import InputSelectField, {Option} from "../../common/InputSelectField";
import SettingService from "../../../services/SettingService";
import SkillService from "../../../services/SkillService";
import {GenesysDialogActions} from "../../common/dialog/GenesysDialogActions";

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
        let currentSetting = await SettingService.getCurrentSetting()
        let skills = await SkillService.getSkills()
        skills = skills.sort((a, b) => a.name.localeCompare(b.name))
        switch (type) {
            case ActorType.Minion:
                let minion = {...await ActorService.createMinion(name)}
                minion.settings.push(currentSetting)
                skills.forEach((skill) => {
                    skill.settings.forEach((setting) => {
                        if (setting.name === currentSetting.name) {
                            minion.skills.push({group: false, ...skill})
                        }
                    })
                })
                await ActorService.updateMinion(minion.name, minion)
                navigate(ActorPath.Minion + minion.name + '/edit')
                break
            case ActorType.Rival:
                let rival = {...await ActorService.createRival(name)}
                rival.settings.push(currentSetting)
                skills.forEach((skill) => {
                    skill.settings.forEach((setting) => {
                        if (setting.name === currentSetting.name) {
                            rival.skills.push({ranks: 0, ...skill})
                        }
                    })
                })
                await ActorService.updateRival(rival.name, rival)
                navigate(ActorPath.Rival + rival.name + '/edit')
                break
            case ActorType.Nemesis:
                let nemesis = {...await ActorService.createNemesis(name)}
                nemesis.settings.push(currentSetting)
                skills.forEach((skill) => {
                    skill.settings.forEach((setting) => {
                        if (setting.name === currentSetting.name) {
                            nemesis.skills.push({ranks: 0, ...skill})
                        }
                    })
                })
                await ActorService.updateNemesis(nemesis.name, nemesis)
                navigate(ActorPath.Nemesis + nemesis.name + '/edit')
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
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}
