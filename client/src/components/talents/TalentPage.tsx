import {Card, CardContent, Grid} from '@mui/material';
import Talent, {Activation, Tier} from "../../models/Talent";
import * as React from "react";
import {useLocation, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import TalentModifierCard from "./modifier/TalentModifierCard";
import TalentService from "../../services/TalentService";
import {ViewFieldCard} from "../common/ViewFieldCard";
import CenteredCardHeaderWithAction from "../common/card/header/CenteredCardHeaderWithAction";
import ActivationCard from "../common/card/select/ActivationCard";
import TierCard from "../common/card/select/TierCard";
import {TextFieldCard} from "../common/card/TextFieldCard";
import {BooleanTextFieldCard} from "../common/card/BooleanTextFieldCard";
import {RootPath} from "../../services/RootPath";
import CostCard from "../common/card/select/CostCard";
import Cost from "../../models/common/Cost";
import Limit from "../../models/common/Limit";
import LimitCard from "../common/card/select/LimitCard";

export default function TalentPage() {
    const {id} = useParams<{ id: string }>();
    const [talent, setTalent] = useState<Talent | null>(null);
    let pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return;
        }
        (async (): Promise<void> => {
            setTalent(await TalentService.getTalent(id));
        })()
    }, [id, setTalent]);

    if (!talent) {
        return <Fragment/>;
    }

    const handleRankedChange = async (value: boolean) => {
        if (talent) {
            setTalent(await TalentService.updateTalent({...talent, ranked: value}));
        }
    };

    const handleActivationChange = async (value: Activation) => {
        if (talent) {
            setTalent(await TalentService.updateTalent({...talent, activation: value}));
        }
    };

    const handleTierChange = async (value: Tier) => {
        if (talent) {
            setTalent(await TalentService.updateTalent({...talent, tier: value}));
        }
    };

    const handleCostChange = async (value: Cost) => {
        if (talent) {
            setTalent(await TalentService.updateTalent({...talent, cost: value}));
        }
    };

    const handleLimitChange = async (value: Limit) => {
        if (talent) {
            setTalent(await TalentService.updateTalent({...talent, limit: value}));
        }
    };

    const handleSummaryChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (talent) {
            setTalent(await TalentService.updateTalent({...talent, summary: event.target.value}));
        }
    };

    const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (talent) {
            setTalent(await TalentService.updateTalent({...talent, description: event.target.value}));
        }
    };

    const renderDescriptionCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Description"} value={talent.description}/> :
            <TextFieldCard title={"Description"} value={talent.description}
                           disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>;
    };

    const renderSummaryCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Summary"} value={talent.summary}/> :
            <TextFieldCard title={"Summary"} value={talent.summary}
                           disabled={pathname.endsWith('/view')} onChange={handleSummaryChange}/>;
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={talent.name} path={RootPath.Talent + talent.id}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <BooleanTextFieldCard title={'Ranked Talent'} value={talent.ranked}
                                              onChange={handleRankedChange} disabled={pathname.endsWith('/view')}/>
                        <ActivationCard value={talent.activation} onChange={handleActivationChange}
                                        disabled={pathname.endsWith('/view')}/>
                        <TierCard value={talent.tier} onChange={handleTierChange}
                                  disabled={pathname.endsWith('/view')}/>
                    </Grid>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <CostCard initialCost={talent.cost} onChange={handleCostChange}
                                  disabled={pathname.endsWith('/view')}/>
                        <LimitCard initialLimit={talent.limit} onChange={handleLimitChange}
                                   disabled={pathname.endsWith('/view')}/>
                    </Grid>
                </Grid>
                <Grid container justifyContent={'center'}>
                    {renderSummaryCard()}
                </Grid>
                <Grid container justifyContent={'center'}>
                    {renderDescriptionCard()}
                </Grid>
                <TalentModifierCard tal={talent}/>
            </CardContent>
        </Card>
    )
}
