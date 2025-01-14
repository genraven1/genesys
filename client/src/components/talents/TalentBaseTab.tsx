import {Grid} from "@mui/material";
import {BooleanTextFieldCard} from "../common/card/BooleanTextFieldCard";
import ActivationCard from "../common/card/select/ActivationCard";
import TierCard from "../common/card/select/TierCard";
import * as React from "react";
import Talent, {Activation, Tier} from "../../models/Talent";
import TalentService from "../../services/TalentService";
import {ViewFieldCard} from "../common/ViewFieldCard";
import {TextFieldCard} from "../common/card/TextFieldCard";

interface Props {
    talent: Talent
    updateTalent: (talent: Talent) => void
    disabled: boolean
}

export default function TalentBaseTab(props: Props) {
    const {talent, updateTalent, disabled} = props;

    const handleRankedChange = async (value: boolean) => {
        if (talent) {
            updateTalent(await TalentService.updateTalent({...talent, ranked: value}));
        }
    };

    const handleActivationChange = async (value: Activation) => {
        if (talent) {
            updateTalent(await TalentService.updateTalent({...talent, activation: value}));
        }
    };

    const handleTierChange = async (value: Tier) => {
        if (talent) {
            updateTalent(await TalentService.updateTalent({...talent, tier: value}));
        }
    };

    const handleSummaryChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (talent) {
            updateTalent(await TalentService.updateTalent({...talent, summary: event.target.value}));
        }
    };

    const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (talent) {
            updateTalent(await TalentService.updateTalent({...talent, description: event.target.value}));
        }
    };

    const renderDescriptionCard = () => {
        return disabled ? <ViewFieldCard name={"Description"} value={talent.description}/> :
            <TextFieldCard title={"Description"} value={talent.description}
                           disabled={disabled} onChange={handleDescriptionChange}/>;
    };

    const renderSummaryCard = () => {
        return disabled ? <ViewFieldCard name={"Summary"} value={talent.summary}/> :
            <TextFieldCard title={"Summary"} value={talent.summary}
                           disabled={disabled} onChange={handleSummaryChange}/>;
    };

    return (
        <Grid container justifyContent={'center'}>
            <Grid container spacing={2}>
                <BooleanTextFieldCard title={'Ranked Talent'} value={talent.ranked}
                                      onChange={handleRankedChange} disabled={disabled}/>
                <ActivationCard value={talent.activation} onChange={handleActivationChange}
                                disabled={disabled}/>
                <TierCard value={talent.tier} onChange={handleTierChange}
                          disabled={disabled}/>
            </Grid>
            <Grid container spacing={2}>
                {renderSummaryCard()}
            </Grid>
            <Grid container spacing={2}>
                {renderDescriptionCard()}
            </Grid>
        </Grid>
    );
}