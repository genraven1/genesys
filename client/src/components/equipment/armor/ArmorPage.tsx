import {Card, CardContent, Grid,} from '@mui/material';
import {useLocation, useParams} from 'react-router-dom';
import * as React from 'react';
import {Armor} from "../../../models/equipment/Armor";
import {EquipmentPath} from "../../../services/Path";
import {Fragment, useEffect, useState} from "react";
import EquipmentService from "../../../services/EquipmentService";
import ArmorModifierCard from "./modifier/ArmorModifierCard";
import ArmorQualityCard from './quality/ArmorQualityCard';
import CenteredCardHeaderWithAction from "../../common/card/CenteredCardHeaderWithAction";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import {NumberTextFieldCard} from "../../common/card/NumberTextField";
import PriceTextFieldCard from "../../common/card/PriceTextFieldCard";
import {TextFieldCard} from "../../common/card/TextFieldCard";
import {BooleanTextFieldCard} from "../../common/card/BooleanTextFieldCard";

export default function ArmorPage() {
    const {id} = useParams<{ id: string }>();
    const [armor, setArmor] = useState<Armor | null>(null);
    let pathname = useLocation().pathname;

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

    const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, description: event.target.value}));
        }
    };

    const handleSoakChange = async (value: number) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, soak: value}));
        }
    };

    const handleDefenseChange = async (value: number) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, defense: value}));
        }
    };

    const handleEncumbranceChange = async (value: number) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, encumbrance: value}));
        }
    };

    const handleRestrictedChange = async (value: boolean) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, restricted: value}));
        }
    };

    const handlePriceChange = async (value: number) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, price: value}));
        }
    };

    const handleRarityChange = async (value: number) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, rarity: value}));
        }
    };

    const renderDescriptionCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Description"} value={armor.description}/> :
            <TextFieldCard title={"Description"} value={armor.description}
                           disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>;
    };

    const renderSoakCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Soak"} value={'+' + armor.soak}/> :
            <NumberTextFieldCard title={"Soak"} value={armor.soak}
                                 disabled={pathname.endsWith('/view')} onChange={handleSoakChange} min={0} max={5}/>;
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={armor.name} path={EquipmentPath.Armor + armor.id}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    {renderDescriptionCard()}
                </Grid>
                <Grid container justifyContent={'center'}>
                    {renderSoakCard()}
                    <NumberTextFieldCard title={'Defense'} value={armor.defense}
                                         onChange={handleDefenseChange} min={0}
                                         max={5} disabled={pathname.endsWith('/view')}/>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <NumberTextFieldCard title={'Encumbrance'} value={armor.encumbrance}
                                         onChange={handleEncumbranceChange} min={1}
                                         max={10} disabled={pathname.endsWith('/view')}/>
                    <BooleanTextFieldCard title={'Restricted'} value={armor.restricted}
                                          disabled={pathname.endsWith('/view')} onChange={handleRestrictedChange}/>
                    <PriceTextFieldCard price={armor.price} restricted={armor.restricted}
                                        onChange={handlePriceChange} min={1} max={10000000}
                                        disabled={pathname.endsWith('/view')}/>
                    <NumberTextFieldCard title={'Rarity'} value={armor.rarity} onChange={handleRarityChange}
                                         min={0}
                                         max={10} disabled={pathname.endsWith('/view')}/>
                </Grid>
                <ArmorQualityCard arm={armor}/>
                <ArmorModifierCard arm={armor}/>
            </CardContent>
        </Card>
    )
}
