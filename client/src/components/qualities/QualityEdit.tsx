import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {InputTextFieldCard} from '../common/InputTextFieldCard';
import {Path} from "../../services/Path";
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";
import CheckButtonCard from "../common/CheckButtonCard";
import Quality from "../../models/Quality";
import QualityService from "../../services/QualityService";
import InputNumberRangeSelectField from "../common/InputNumberRangeSelect";

interface Props {
    qual: Quality
}

export default function QualityEdit(props: Props) {
    const {qual} = props
    const {id} = useParams<{ id: string }>()
    const [quality, setQuality] = useState<Quality>(qual)

    let navigate = useNavigate()

    useEffect(() => {
        setQuality(qual)
    }, [qual])

    const onChange = async (key: keyof Quality, value: string) => {
        if (value.trim().length === 0 || (quality !== null && quality!![key] === value)) {
            return
        }
        const copyQuality = {...quality} as Quality;
        switch (key) {
            case 'description':
                copyQuality.description = value
                break
            case "passive":
                copyQuality.passive = !Boolean(copyQuality.passive)
                break
            case "cost":
                copyQuality.cost = Number(value)
                break
            case "armor":
                copyQuality.armor = !Boolean(copyQuality.armor)
                break
            case "weapon":
                copyQuality.weapon = !Boolean(copyQuality.weapon)
                break
        }
        setQuality(copyQuality)

        await QualityService.updateQuality(copyQuality.id, copyQuality)
    }

    const onView = () => {
        navigate(Path.Qualities + id!! + '/view');
    }

    return (
        <Card>
            <CardHeader title={quality?.name!!} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <InputTextFieldCard defaultValue={quality?.description!!} onCommit={(value: string): void => {
                            onChange('description', value)
                        }} title={'Description'} helperText={'Description'} placeholder={'Description'}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={10}>
                        <CheckButtonCard title={'Usable on Armor'} value={quality?.armor!!}
                                         onChange={(value: boolean): void => {
                                             onChange('armor', String(value))
                                         }}/>
                        <CheckButtonCard title={'Usable on Weapons'} value={quality?.weapon!!}
                                         onChange={(value: boolean): void => {
                                             onChange('weapon', String(value))
                                         }}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={10}>
                        <CheckButtonCard title={'Passive Quality'} value={quality?.passive!!}
                                         onChange={(value: boolean): void => {
                                             onChange('passive', String(value))
                                         }}/>
                        <InputNumberRangeSelectField defaultValue={quality?.cost!!} min={0} max={4}
                                                     onCommit={(value: number): void => {
                                                         onChange('cost', String(value))
                                                     }}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
