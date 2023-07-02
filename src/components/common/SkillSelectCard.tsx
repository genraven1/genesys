import Skill, {SkillType} from "../../models/actor/Skill";
import {
    Card,
    CardContent,
    ClickAwayListener,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import EditField from "./EditField";
import SkillService from "../../services/SkillService";
import SettingService from "../../services/SettingService";
import Setting from "../../models/Setting";
import CenteredCardHeader from "./card/CenteredCardHeader";

interface TypeProps {
    defaultValue: Skill
    onCommit: (value: Skill) => void
    type: SkillType
}

export function SkillSelectCard(props: TypeProps): JSX.Element {
    const {defaultValue, onCommit, type} = props
    const [skills, setSkills] = useState<Skill[]>([])
    const [setting, setSetting] = useState<Setting>()

    useEffect(() => {
        (async (): Promise<void> => {
            const currentSetting = await SettingService.getCurrentSetting()
            if (!currentSetting) {
                return
            }
            setSetting(currentSetting)
        })()
    }, [setSetting])

    useEffect(() => {
        (async (): Promise<void> => {
            const skillList = await SkillService.getSkills()
            if (!skillList) {
                return
            }
            setSkills(skillList.filter((skill) => skill.type === type).filter((skill) => skill.settings.includes(setting?.name!!)))
        })()
    }, [setting?.name, type])

    return (
        <Card>
            <CenteredCardHeader title={'Required Skill'}/>
            <CardContent>
                <SkillSelectField defaultValue={defaultValue} skills={skills} onCommit={onCommit}/>
            </CardContent>
        </Card>
    )
}

interface AllProps {
    defaultValue: Skill
    onCommit: (value: Skill) => void
}

export function AllSkillsSelectCard(props: AllProps): JSX.Element {
    const {defaultValue, onCommit} = props
    const [skills, setSkills] = useState<Skill[]>([])
    const [setting, setSetting] = useState<Setting>()

    useEffect(() => {
        (async (): Promise<void> => {
            const currentSetting = await SettingService.getCurrentSetting()
            if (!currentSetting) {
                return
            }
            setSetting(currentSetting)
        })()
    }, [setSetting])

    useEffect(() => {
        (async (): Promise<void> => {
            const skillList = await SkillService.getSkills()
            if (!skillList) {
                return
            }
            setSkills(skillList.filter((skill) => skill.settings.includes(setting?.name!!)))
        })()
    }, [])

    return (
        <Card>
            <CenteredCardHeader title={'Required Skill'}/>
            <CardContent>
                <SkillSelectField defaultValue={defaultValue} skills={skills} onCommit={onCommit}/>
            </CardContent>
        </Card>
    )
}

interface FieldProps {
    defaultValue: Skill
    skills: Skill[]
    onCommit: (value: Skill) => void
    onChange?: (value: Skill) => void
}

function SkillSelectField(props: FieldProps): JSX.Element {
    const {defaultValue, skills, onCommit, onChange} = props
    const [skill, setSkill] = useState(defaultValue)
    const [edit, setEdit] = useState(false)

    const handleOnCommit = (): void => {
        setEdit(!edit)
        onCommit(skill)
    }

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>): void => {

        let selectedSkill = skills.find((sk) => sk.name === event.target.value)!!
        setSkill(selectedSkill)

        if (onChange) {
            onChange(selectedSkill)
        }
    }

    const editElement = (
        <ClickAwayListener mouseEvent="onMouseUp" onClickAway={handleOnCommit}>
            <TextField value={skill} helperText={'Required Skill'} onChange={inputOnChange} select fullWidth>
                {skills.map((skill: Skill) => (<MenuItem key={skill.name} value={skill.name}>{skill.name}</MenuItem>))}
            </TextField>
        </ClickAwayListener>
    )

    const viewElement = <Typography style={{wordWrap: 'break-word'}}>{skill?.name!!}</Typography>

    const onCancel = (): void => {
        setEdit(!edit)
        setSkill(defaultValue)
    }

    return (
        <EditField viewElement={viewElement} edit={edit} editable={true} editElement={editElement}
                   onEdit={(): void => setEdit(!edit)} onCancel={(): void => onCancel()} onCommit={handleOnCommit}/>
    )
}