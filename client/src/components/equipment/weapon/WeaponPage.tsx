import {
    Card,
    CardContent,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
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
import EquipmentService from "../../../services/EquipmentService";
import Skill, {SkillType} from "../../../models/actor/Skill";
import TableCell from "@mui/material/TableCell";
import {useFetchSkillsByType} from "../../skills/SkillWorkflow";
import {RangeBand} from "../../../models/common/RangeBand";
import WeaponQualityCard from "./quality/WeaponQualityCard";
import WeaponModifierCard from "./modifier/WeaponModifierCard";
import CenteredCardHeaderWithAction from "../../common/card/CenteredCardHeaderWithAction";
import {
    BooleanTextFieldCard,
    SkillAutocompleteCard,
    TextFieldCard,
    ViewFieldCard
} from "../../common/ViewFieldCard";
import RangeBandCard from "../../common/card/select/RangeBandCard";
import {NumberTextFieldCard} from "../../common/card/NumberTextField";

export default function WeaponPage() {
    const {id} = useParams<{ id: string }>();
    const [weapon, setWeapon] = useState<Weapon | null>(null);
    const skills = useFetchSkillsByType(SkillType.Combat);
    let pathname = useLocation().pathname;
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

    const handleHandsChange = async (value: number) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, hands: value}));
        }
    };

    const handleDamageChange = async (value: number) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, damage: value}));
        }
    };

    const handleBrawnChange = async (value: boolean) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, brawn: value}));
        }
    };

    const handleCriticalChange = async (value: number) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, critical: value}));
        }
    };

    const handleRangeBandChange = async (value: RangeBand) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, range: value}));
        }
    };

    const handleEncumbranceChange = async (value: string) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, encumbrance: Number(value)}));
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

    const handleRarityChange = async (value: string) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, rarity: Number(value)}));
        }
    };

    const renderDescriptionCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Description"} value={weapon.description}/> :
            <TextFieldCard title={"Description"} value={weapon.description}
                           disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>;
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={weapon.name} path={EquipmentPath.Weapon + weapon.id}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container justifyContent={'center'}>
                        <SkillAutocompleteCard disabled={pathname.endsWith('/view')}
                                               handleSkillChange={handleSkillChange} skills={skills}
                                               startingSkill={weapon.skill}/>
                        <RangeBandCard value={weapon.range} onChange={handleRangeBandChange}
                                       disabled={pathname.endsWith('/view')}/>
                    </Grid>
                    <Grid container justifyContent={'center'}>
                        <NumberTextFieldCard title={'Hands'} value={weapon.hands} onChange={handleHandsChange} min={1}
                                             max={2} disabled={pathname.endsWith('/view')}/>
                        <BooleanTextFieldCard title={'Brawn Powered'} value={weapon.brawn}
                                              disabled={pathname.endsWith('/view')} onChange={handleBrawnChange}/>
                        <NumberTextFieldCard title={'Damage'} value={weapon.damage} onChange={handleDamageChange} min={1}
                                             max={2} disabled={pathname.endsWith('/view')}/>
                        <NumberTextFieldCard title={'Critical'} value={weapon.critical} onChange={handleCriticalChange} min={1}
                                             max={2} disabled={pathname.endsWith('/view')}/>
                    </Grid>
                    <Grid container justifyContent={'center'}>

                    </Grid>
                    {renderDescriptionCard()}
                    <Divider/>


                    <TableContainer component={Paper}>
                        <Table>
                            {renderSingleRowTableHeader(headers)}
                            <TableBody>
                                <TableRow key={weapon.id}>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={weapon.encumbrance}
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
                                            value={weapon.restricted && pathname.endsWith('/view') ? `${weapon.price}(R)` : weapon.price}
                                            label="Price"
                                            onChange={(e) => handlePriceChange(e.target.value)}
                                            inputProps={{min: 0, max: 1000000}}
                                            disabled={pathname.endsWith('/view')}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={weapon.rarity}
                                            label="Rarity"
                                            onChange={(e) => handleRarityChange(e.target.value)}
                                            inputProps={{min: 0, max: 10}}
                                            disabled={pathname.endsWith('/view')}
                                        />
                                    </TableCell>
                                    <TypographyCenterTableCell value={renderQualities(weapon)}/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <WeaponQualityCard weap={weapon}/>
                    <WeaponModifierCard weap={weapon}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
