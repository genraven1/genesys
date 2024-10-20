import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import {ViewFieldCard} from "../common/ViewFieldCard";
import Archetype from "../../models/actor/player/Archetype";
import {ViewCharacteristicCard} from "../actor/CharacteristicCard";
import {CharacteristicType} from "../../models/character/Characteristic";
import {Card, Grid} from "@mui/material";
import {StatsType} from "../../models/actor/Stats";
import CenteredCardHeader from "../common/card/CenteredCardHeader";

interface Props {
    archetype: Archetype
    open: boolean
    onClose: () => void
}

export default function ArchetypeBackdrop(props: Props) {
    const {archetype, open, onClose} = props

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClose}>
            <Card>
                <CenteredCardHeader title={archetype.name}/>
                <Grid container>
                    <ViewCharacteristicCard characteristic={archetype.brawn} type={CharacteristicType.Brawn}/>
                    <ViewCharacteristicCard characteristic={archetype.agility} type={CharacteristicType.Agility}/>
                    <ViewCharacteristicCard characteristic={archetype.intellect} type={CharacteristicType.Intellect}/>
                    <ViewCharacteristicCard characteristic={archetype.cunning} type={CharacteristicType.Cunning}/>
                    <ViewCharacteristicCard characteristic={archetype.willpower} type={CharacteristicType.Willpower}/>
                    <ViewCharacteristicCard characteristic={archetype.presence} type={CharacteristicType.Presence}/>
                </Grid>
                <Grid container>
                    <ViewFieldCard name={StatsType.Wounds + ' Threshold'} value={String(archetype.wounds)}/>
                    <ViewFieldCard name={StatsType.Strain + ' Threshold'} value={String(archetype.strain)}/>
                    <ViewFieldCard name={'Base Experience'} value={String(archetype.experience)}/>
                </Grid>
            </Card>
        </Backdrop>
    )
}
