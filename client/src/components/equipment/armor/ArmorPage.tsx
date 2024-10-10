import {
    Card,
    CardContent,
    CardHeader,
    FormControl,
    Grid,
    IconButton,
    InputLabel, MenuItem, Select,
    TextField
} from '@mui/material';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {Armor} from "../../../models/equipment/Armor";
import {EquipmentPath} from "../../../services/Path";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import {Fragment, useEffect, useState} from "react";
import EquipmentService from "../../../services/EquipmentService";
import CheckIcon from "@mui/icons-material/Check";
import ArmorModifierCard from "./modifier/ArmorModifierCard";
import ArmorQualityCard from './quality/ArmorQualityCard';
import TableCell from "@mui/material/TableCell";

export default function ArmorPage() {
    const {id} = useParams<{ id: string }>();
    const [armor, setArmor] = useState<Armor | null>(null);
    let pathname = useLocation().pathname;
    let navigate = useNavigate();
    const headers = ['Name', 'Defense', 'Soak', 'Encumbrance', 'Price', 'Rarity', 'Qualities']

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setArmor(await EquipmentService.getArmor(id));
        })()
    }, [id, setArmor])

    if (!armor) {
        return <Fragment/>;
    }

    const onPageChange = () => {
        if (pathname.endsWith('/view')) {
            return (
                <IconButton title='Edit' size='small'
                            onClick={(): void => navigate(EquipmentPath.Armor + id + '/edit')}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        } else {
            return (
                <IconButton title='View' size='small'
                            onClick={(): void => navigate(EquipmentPath.Armor + id + '/view')}>
                    <CheckIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        }
    }

    const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, description: event.target.value}));
        }
    };

    const handleSoakChange = async (value: string) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, soak: Number(value)}));
        }
    };

    const handleDefenseChange = async (value: string) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, defense: Number(value)}));
        }
    };

    const handleEncumbranceChange = async (value: string) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, encumbrance: Number(value)}));
        }
    };

    const handleRestrictedChange = async (value: boolean) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, restricted: value}));
        }
    };

    const handlePriceChange = async (value: string) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, price: Number(value)}));
        }
    };

    const handleRarityChange = async (value: string) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, rarity: Number(value)}));
        }
    };

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={armor.name} action={onPageChange()}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <Grid item xs>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={2}
                                value={armor.description}
                                onChange={handleDescriptionChange}
                                disabled={pathname.endsWith('/view')}
                            />
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table>
                            {renderSingleRowTableHeader(headers)}
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={'+' + armor.soak}
                                            label="Soak"
                                            onChange={(e) => handleSoakChange(e.target.value)}
                                            inputProps={{min: 1, max: 6}}
                                            disabled={pathname.endsWith('/view')}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={armor.defense}
                                            label="Defense"
                                            onChange={(e) => handleDefenseChange(e.target.value)}
                                            inputProps={{min: 1, max: 6}}
                                            disabled={pathname.endsWith('/view')}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={armor.encumbrance}
                                            label="Encumbrance"
                                            onChange={(e) => handleEncumbranceChange(e.target.value)}
                                            inputProps={{min: 1, max: 10}}
                                            disabled={pathname.endsWith('/view')}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormControl fullWidth>
                                            <InputLabel>Restricted</InputLabel>
                                            <Select
                                                value={armor.restricted ? 'Yes' : 'No'}
                                                onChange={(e) => handleRestrictedChange(e.target.value === 'Yes')}
                                                label="Restricted"
                                                disabled={pathname.endsWith('/view')}
                                            >
                                                <MenuItem value="Yes">Yes</MenuItem>
                                                <MenuItem value="No">No</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            type="number"
                                            value={armor.restricted && pathname.endsWith('/view') ? `${armor.price}(R)` : armor.price}
                                            label="Price"
                                            onChange={(e) => handlePriceChange(e.target.value)}
                                            inputProps={{min: 0, max: 1000000}}
                                            disabled={pathname.endsWith('/view')}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={armor.rarity}
                                            label="Rarity"
                                            onChange={(e) => handleRarityChange(e.target.value)}
                                            inputProps={{min: 0, max: 10}}
                                            disabled={pathname.endsWith('/view')}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ArmorQualityCard arm={armor}/>
                    <ArmorModifierCard arm={armor}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
