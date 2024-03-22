import {ChangeEvent, useEffect, useState} from "react";
import {Card, CardContent, ClickAwayListener, Grid, MenuItem, TextField, Typography} from "@mui/material";
import EditField from "../../common/EditField";
import Setting from "../../../models/Setting";
import SettingService from "../../../services/SettingService";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import CareerService from "../../../services/CareerService";
import Career from "../../../models/actor/player/Career";

interface AllProps {
    defaultValue: Career
    onCommit: (value: Career) => void
}

export default function CareerSelectCard(props: AllProps): JSX.Element {
    const {defaultValue, onCommit} = props
    const [careers, setCareers] = useState<Career[]>([])
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
            const careerList = await CareerService.getCareers()
            if (!careerList) {
                return
            }
            let temp = [] as Career[]
            careerList.forEach((career, index) => {
                if (career.settings.some(set => set.name === setting?.name!!)) {
                    temp.push(career)
                }
            })
            setCareers(temp)
        })()
    }, [setting])

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Career'}/>
                <CardContent>
                    <CardSelectField defaultValue={defaultValue} careers={careers} onCommit={onCommit}/>
                </CardContent>
            </Card>
        </Grid>
    )
}

interface FieldProps {
    defaultValue: Career
    careers: Career[]
    onCommit: (value: Career) => void
    onChange?: (value: Career) => void
}

function CardSelectField(props: FieldProps): JSX.Element {
    const {defaultValue, careers, onCommit, onChange} = props
    const [career, setCareer] = useState(defaultValue)
    const [edit, setEdit] = useState(false)

    const handleOnCommit = (): void => {
        setEdit(!edit)
        onCommit(career)
    }

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>): void => {

        let selectedCareer = careers.find((sk) => sk.name === event.target.value) as Career
        setCareer(selectedCareer)

        if (onChange) {
            onChange(selectedCareer)
        }
    }

    const editElement = (
        <ClickAwayListener mouseEvent="onMouseUp" onClickAway={handleOnCommit}>
            <TextField value={career} helperText={'Career'} onChange={inputOnChange} select fullWidth>
                {careers.map((career: Career) => (
                    <MenuItem key={career.name} value={career.name}>{career.name}</MenuItem>))}
            </TextField>
        </ClickAwayListener>
    )

    const viewElement = career && <Typography style={{wordWrap: 'break-word'}}>{career.name}</Typography>

    const onCancel = (): void => {
        setEdit(!edit)
        setCareer(defaultValue)
    }

    return (
        <EditField viewElement={viewElement} edit={edit} editable={true} editElement={editElement}
                   onEdit={(): void => setEdit(!edit)} onCancel={(): void => onCancel()} onCommit={handleOnCommit}/>
    )
}