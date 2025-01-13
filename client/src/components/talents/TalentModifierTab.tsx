import Talent, {TalentSkills} from "../../models/Talent";
import {Grid} from "@mui/material";
import CostCard from "../common/card/select/CostCard";
import LimitCard from "../common/card/select/LimitCard";
import * as React from "react";
import TalentModifierCard from "./modifier/TalentModifierCard";
import TalentCareerSkillsCard from "./skill/TalentCareerSkillsCard";
import TalentSkillCheckCard from "./skill/TalentSkillCheckCard";
import {NumberTextFieldCard} from "../common/card/NumberTextField";
import {StatsType} from "../../models/actor/Stats";
import {ViewFieldCard} from "../common/ViewFieldCard";
import Cost from "../../models/common/Cost";
import Limit from "../../models/common/Limit";

interface Props {
    talent: Talent
    updateTalent: (talent: Talent) => void
    disabled: boolean
}

export default function TalentModifierTab(props: Props) {
    const {talent, updateTalent, disabled} = props;

    const handleCostChange = async (value: Cost) => {
        if (talent) {
            updateTalent({...talent, cost: value});
        }
    };

    const handleLimitChange = async (value: Limit) => {
        if (talent) {
            updateTalent({...talent, limit: value});
        }
    };

    const handleTalentSkillsChange = async (value: TalentSkills) => {
        if (talent) {
            updateTalent({...talent, talentSkills: value});
        }
    };

    const handleWoundsChange = async (value: number) => {
        if (talent) {
            updateTalent({
                ...talent,
                talentStats: {wounds: value, strain: talent.talentStats.strain}
            });
        }
    };

    const handleStrainChange = async (value: number) => {
        if (talent) {
            updateTalent({
                ...talent,
                talentStats: {wounds: talent.talentStats.wounds, strain: value}
            });
        }
    };

    const renderWoundsCard = () => {
        return disabled ?
            <ViewFieldCard name={StatsType.Wounds + ' Threshold'} value={String(talent.talentStats.wounds)}/> :
            <NumberTextFieldCard title={StatsType.Wounds + ' Threshold'} value={talent.talentStats.wounds}
                                 onChange={handleWoundsChange} min={0} max={5}
                                 disabled={disabled}/>
    };

    const renderStrainCard = () => {
        return disabled ?
            <ViewFieldCard name={StatsType.Strain + ' Threshold'} value={String(talent.talentStats.strain)}/> :
            <NumberTextFieldCard title={StatsType.Strain + ' Threshold'} value={talent.talentStats.strain}
                                 onChange={handleStrainChange} min={0} max={5}
                                 disabled={disabled}/>
    };

    return (
        <Grid container justifyContent={'center'}>
            <Grid container spacing={2}>
                <CostCard initialCost={talent.cost} onChange={handleCostChange}
                          disabled={disabled}/>
                <LimitCard initialLimit={talent.limit} onChange={handleLimitChange}
                           disabled={disabled}/>
            </Grid>
            <Grid container spacing={2}>
                <TalentCareerSkillsCard talentSkills={talent.talentSkills}
                                        updateTalentSkills={handleTalentSkillsChange}
                                        disabled={disabled}/>
            </Grid>
            <Grid container spacing={2}>
                <TalentSkillCheckCard talent={talent} updateTalent={updateTalent}
                                      disabled={disabled}/>
            </Grid>
            <Grid container spacing={2}>
                {renderWoundsCard()}
                {renderStrainCard()}
            </Grid>
            <TalentModifierCard tal={talent}/>
        </Grid>
    );
}