import {
    Card,
    CardContent,
    CardHeader,
    FormControl,
    Grid,
    IconButton,
    InputLabel, MenuItem,
    Select,
    TextField
} from '@mui/material';
import * as React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {RootPath} from "../../services/Path";
import EditIcon from "@mui/icons-material/Edit";
import {Fragment, useEffect, useState} from "react";
import Quality from "../../models/Quality";
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
                            onClick={(): void => navigate(RootPath.Qualities + id + '/edit')}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        } else {
            return (
                <IconButton title='View' size='small'
                            onClick={(): void => navigate(RootPath.Qualities + id + '/view')}>
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

    const handleArmorQualityChange = async (value: boolean) => {
        if (quality) {
            setQuality(await QualityService.updateQuality({...quality, armor: value}));
        }
    };

    const handleWeaponQualityChange = async (value: boolean) => {
        if (quality) {
            setQuality(await QualityService.updateQuality({...quality, weapon: value}));
        }
    };

    const handleCostChange = async (value: string) => {
        if (quality) {
            setQuality(await QualityService.updateQuality({...quality, cost: Number(value)}));
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
                        <Grid item xs>
                            <FormControl fullWidth>
                                <InputLabel>Armor Quality</InputLabel>
                                <Select
                                    value={quality.armor ? 'Yes' : 'No'}
                                    onChange={(e) => handleArmorQualityChange(e.target.value === 'Yes')}
                                    label="Armor"
                                    disabled={pathname.endsWith('/view')}
                                >
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl fullWidth>
                                <InputLabel>Weapon Quality</InputLabel>
                                <Select
                                    value={quality.weapon ? 'Yes' : 'No'}
                                    onChange={(e) => handleWeaponQualityChange(e.target.value === 'Yes')}
                                    label="Weapon"
                                    disabled={pathname.endsWith('/view')}
                                >
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                type="number"
                                value={quality.cost}
                                label="Advantage Cost"
                                onChange={(e) => handleCostChange(e.target.value)}
                                inputProps={{min: 0, max: 3}}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                    </Grid>
                    <QualityModifierCard qual={quality}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
