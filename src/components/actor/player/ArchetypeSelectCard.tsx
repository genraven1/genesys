import {Card, CardContent, ClickAwayListener, Grid, MenuItem, TextField, Typography} from "@mui/material";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import {ChangeEvent, useEffect, useState} from "react";
import {useFetchCurrentSetting} from "../../setting/SettingWorkflow";
import Archetype from "../../../models/actor/player/Archetype";
import ArchetypeService from "../../../services/ArchetypeService";
import EditField from "../../common/EditField";

interface AllProps {
    defaultValue: Archetype
    onCommit: (value: Archetype) => void
}

export default function ArchetypeSelectCard(props: AllProps): JSX.Element {
    const {defaultValue, onCommit} = props
    const [archetypes, setArchetypes] = useState<Archetype[]>([])
    const current = useFetchCurrentSetting()

    useEffect(() => {
        (async (): Promise<void> => {
            const archetypeList = await ArchetypeService.getArchetypes()
            if (!archetypeList) {
                return
            }
            let temp = [] as Archetype[]
            archetypeList.forEach((archetype, index) => {
                if (archetype.settings.some(set => set.name === current.name)) {
                    temp.push(archetype)
                }
            })
            setArchetypes(temp)
        })()
    }, [current])

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Archetype'}/>
                <CardContent>
                    <ArchetypeSelectField defaultValue={defaultValue} archetypes={archetypes} onCommit={onCommit}/>
                </CardContent>
            </Card>
        </Grid>
    )
}

interface FieldProps {
    defaultValue: Archetype
    archetypes: Archetype[]
    onCommit: (value: Archetype) => void
    onChange?: (value: Archetype) => void
}

function ArchetypeSelectField(props: FieldProps): JSX.Element {
    const {defaultValue, archetypes, onCommit, onChange} = props
    const [archetype, setArchetype] = useState(defaultValue)
    const [edit, setEdit] = useState(false)

    const handleOnCommit = (): void => {
        setEdit(!edit)
        onCommit(archetype)
    }

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>): void => {

        let selectedArchetype = archetypes.find((sk) => sk.name === event.target.value) as Archetype
        setArchetype(selectedArchetype)

        if (onChange) {
            onChange(selectedArchetype)
        }
    }

    const editElement = (
        <ClickAwayListener mouseEvent="onMouseUp" onClickAway={handleOnCommit}>
            <TextField value={archetype} helperText={'Archetype'} onChange={inputOnChange} select fullWidth>
                {archetypes.map((archetype: Archetype) => (
                    <MenuItem key={archetype.name} value={archetype.name}>{archetype.name}</MenuItem>))}
            </TextField>
        </ClickAwayListener>
    )

    const viewElement = archetype && <Typography style={{wordWrap: 'break-word'}}>{archetype.name}</Typography>

    const onCancel = (): void => {
        setEdit(!edit)
        setArchetype(defaultValue)
    }

    return (
        <EditField viewElement={viewElement} edit={edit} editable={true} editElement={editElement}
                   onEdit={(): void => setEdit(!edit)} onCancel={(): void => onCancel()} onCommit={handleOnCommit}/>
    )
}