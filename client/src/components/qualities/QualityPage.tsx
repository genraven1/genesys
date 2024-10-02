import {Card, CardContent, CardHeader, Grid, IconButton, TextField} from '@mui/material';
import {ViewFieldCard, ViewQualityActivationCard} from "../common/ViewFieldCard";
import * as React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {RootPath} from "../../services/Path";
import EditIcon from "@mui/icons-material/Edit";
import {Fragment, useEffect, useState} from "react";
import Quality from "../../models/Quality";
import {renderUsable} from "../../models/equipment/EquipmentHelper";
import QualityModifierCard from "./modifiers/QualityModifierCard";
import QualityService from "../../services/QualityService";
import CheckIcon from "@mui/icons-material/Check";

export default function QualityPage() {
    const {id} = useParams<{ id: string }>()
    const [quality, setQuality] = useState<Quality | null>(null)
    let pathname = useLocation().pathname
    let navigate = useNavigate()

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setQuality(await QualityService.getQuality(id))
        })()
    }, [id, setQuality])

    if (!quality) {
        return <Fragment/>;
    }

    const onPageChange = () => {
        if (pathname.endsWith('/view')) {
            return (
                <IconButton title='Edit' size='small'
                            onClick={(): void => navigate(RootPath.Skills + id + '/edit')}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        } else {
            return (
                <IconButton title='View' size='small'
                            onClick={(): void => navigate(RootPath.Skills + id + '/view')}>
                    <CheckIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        }
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (quality) {
            setQuality({...quality, description: event.target.value});
        }
    };

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={quality.name} action={onPageChange()}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container justifyContent={'center'}>
                        <Grid item xs>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={2}
                                value={quality.description}
                                onChange={handleDescriptionChange}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <ViewFieldCard name={'Quality Used on'} value={renderUsable(quality)}/>
                        <ViewQualityActivationCard quality={quality}/>
                    </Grid>
                    <QualityModifierCard qual={quality}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
