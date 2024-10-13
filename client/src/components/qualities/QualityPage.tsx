import {Card, CardContent, Grid,} from '@mui/material';
import * as React from "react";
import {useLocation, useParams} from "react-router-dom";
import {RootPath} from "../../services/Path";
import {Fragment, useEffect, useState} from "react";
import Quality from "../../models/Quality";
import QualityModifierCard from "./modifiers/QualityModifierCard";
import QualityService from "../../services/QualityService";
import {BooleanTextFieldCard, TextFieldCard, ViewFieldCard} from "../common/ViewFieldCard";
import CenteredCardHeaderWithAction from "../common/card/CenteredCardHeaderWithAction";
import {NumberTextFieldCard} from "../common/card/NumberTextField";

export default function QualityPage() {
    const {id} = useParams<{ id: string }>()
    const [quality, setQuality] = useState<Quality | null>(null)
    let pathname = useLocation().pathname

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

    const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (quality) {
            setQuality(await QualityService.updateQuality({...quality, description: event.target.value}));
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

    const handleCostChange = async (value: number) => {
        if (quality) {
            setQuality(await QualityService.updateQuality({...quality, cost: value}));
        }
    };

    const renderDescriptionCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Description"} value={quality.description}/> :
            <TextFieldCard title={"Description"} value={quality.description}
                           disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>;
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={quality.name} path={RootPath.Qualities + quality.id}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container justifyContent={'center'}>
                        {renderDescriptionCard()}
                    </Grid>
                    <Grid container spacing={2}>
                        <BooleanTextFieldCard title={"Armor Quality"} value={quality.armor}
                                              disabled={pathname.endsWith('/view')}
                                              onChange={handleArmorQualityChange}/>
                        <BooleanTextFieldCard title={"Weapon Quality"} value={quality.weapon}
                                              disabled={pathname.endsWith('/view')}
                                              onChange={handleWeaponQualityChange}/>
                        <NumberTextFieldCard title={"Advantage Cost"} value={quality.cost} onChange={handleCostChange}
                                             min={0} max={3} disabled={pathname.endsWith('/view')}/>
                    </Grid>
                    <QualityModifierCard qual={quality}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
