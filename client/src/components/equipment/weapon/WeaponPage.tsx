import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {Weapon} from "../../../models/equipment/Weapon";
import {EquipmentPath} from "../../../services/Path";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {renderQualities,} from "../../../models/equipment/EquipmentHelper";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import CheckIcon from "@mui/icons-material/Check";
import EquipmentService from "../../../services/EquipmentService";
import {Autocomplete} from "@mui/lab";
import {renderSkillName} from "../../common/skill/SkillRenders";
import Skill, {SkillType} from "../../../models/actor/Skill";
import TableCell from "@mui/material/TableCell";
import {useFetchSkillsByType} from "../../skills/SkillWorkflow";
import {RangeBand} from "../../../models/common/RangeBand";

export default function WeaponPage() {
    const {id} = useParams<{ id: string }>();
    const [weapon, setWeapon] = useState<Weapon | null>(null);
    const skills = useFetchSkillsByType(SkillType.Combat);
    let pathname = useLocation().pathname;
    let navigate = useNavigate();
    const headers = ['Name', 'Skill', 'Hands', 'Damage', 'Critical', 'Range', 'Price', 'Special Qualities'];

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setWeapon(await EquipmentService.getWeapon(id));
        })()
    }, [id, setWeapon])

    if (!weapon) {
        return <Fragment/>;
    }

    const onPageChange = () => {
        if (pathname.endsWith('/view')) {
            return (
                <IconButton title='Edit' size='small'
                            onClick={(): void => navigate(EquipmentPath.Weapon + id + '/edit')}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        } else {
            return (
                <IconButton title='View' size='small'
                            onClick={(): void => navigate(EquipmentPath.Weapon + id + '/view')}>
                    <CheckIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        }
    }

    const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, description: event.target.value}));
        }
    };

    const handleSkillChange = async (value: Skill) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, skill: value}));
        }
    };

    const handleHandsChange = async (value: string) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, hands: Number(value)}));
        }
    };

    const handleDamageChange = async (value: string) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, damage: Number(value)}));
        }
    };

    const handleBrawnChange = async (value: boolean) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, brawn: value}));
        }
    };

    const handleCriticalChange = async (value: string) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, critical: Number(value)}));
        }
    };

    const handleRangeBandChange = async (value: RangeBand) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, range: value}));
        }
    };

    const handleRestrictedChange = async (value: boolean) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, restricted: value}));
        }
    };

    const handlePriceChange = async (value: string) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, price: Number(value)}));
        }
    };

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={weapon.name} action={onPageChange()}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid item xs>
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                            value={weapon.description}
                            onChange={handleDescriptionChange}
                            disabled={pathname.endsWith('/view')}
                        />
                    </Grid>
                    <Divider/>
                    <TableContainer component={Paper}>
                        <Table>
                            {renderSingleRowTableHeader(headers)}
                            <TableBody>
                                <TableRow key={weapon.id}>
                                    <TypographyCenterTableCell value={weapon.name}/>
                                    <TableCell>
                                        <Autocomplete
                                            options={skills}
                                            getOptionLabel={(option) => renderSkillName(option)}
                                            value={weapon.skill}
                                            onChange={(e, newValue) => handleSkillChange(newValue as Skill)}
                                            renderInput={(params) => <TextField {...params} label="Skill"
                                                                                variant="outlined"/>}
                                            disabled={!pathname.endsWith(weapon.id + '/edit')}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={weapon.hands}
                                            label="Number of Hands"
                                            onChange={(e) => handleHandsChange(e.target.value)}
                                            inputProps={{min: 1, max: 2}}
                                            disabled={pathname.endsWith('/view')}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormControl fullWidth>
                                            <InputLabel>Brawn</InputLabel>
                                            <Select
                                                value={weapon.brawn ? 'Yes' : 'No'}
                                                onChange={(e) => handleBrawnChange(e.target.value === 'Yes')}
                                                label="Brawn Powered"
                                                disabled={pathname.endsWith('/view')}
                                            >
                                                <MenuItem value="Yes">Yes</MenuItem>
                                                <MenuItem value="No">No</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            type="number"
                                            value={weapon.brawn && pathname.endsWith('/view') ? `Brawn + ${weapon.damage}` : weapon.damage}
                                            label="Damage"
                                            onChange={(e) => handleDamageChange(e.target.value)}
                                            inputProps={{min: 0, max: 20}}
                                            disabled={pathname.endsWith('/view')}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={weapon.critical}
                                            label="Critical"
                                            onChange={(e) => handleCriticalChange(e.target.value)}
                                            inputProps={{min: 1, max: 6}}
                                            disabled={pathname.endsWith('/view')}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            options={Object.values(RangeBand)}
                                            getOptionLabel={(option) => option}
                                            value={weapon.range}
                                            onChange={(e, newValue) => handleRangeBandChange(newValue as RangeBand)}
                                            renderInput={(params) => <TextField {...params} label="Range"
                                                                                variant="outlined"/>}
                                            disabled={pathname.endsWith('/view')}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormControl fullWidth>
                                            <InputLabel>Restricted</InputLabel>
                                            <Select
                                                value={weapon.restricted ? 'Yes' : 'No'}
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
                                            value={weapon.restricted && pathname.endsWith('/view') ? `${weapon.price} (R)` : weapon.price}
                                            label="Price"
                                            onChange={(e) => handlePriceChange(e.target.value)}
                                            inputProps={{min: 0, max: 1000000}}
                                            disabled={pathname.endsWith('/view')}
                                        />
                                    </TableCell>
                                    <TypographyCenterTableCell value={renderQualities(weapon)}/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </CardContent>
        </Card>
    )
}
