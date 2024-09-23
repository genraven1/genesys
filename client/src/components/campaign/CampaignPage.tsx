import Campaign from "../../models/campaign/Campaign";
import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import PartyCard from "./party/PartyCard";
import {useState} from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import ViewCampaignTalents from "./talents/ViewCampaignTalents";
import ViewCampaignSkills from "./skill/ViewCampaignSkills";

interface Props {
    campaign: Campaign
}

export default function CampaignPage(props: Props) {
    const {campaign} = props;
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    const renderPartyDashboard = () => {
        return <PartyCard party={campaign.party}/>
    }

    const renderTalentDashboard = () => {
        return <ViewCampaignTalents campaign_name={campaign.name}/>
    }

    const renderSkillDashboard = () => {
        return <ViewCampaignSkills campaign_name={campaign.name}/>
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={campaign.name}>
            </CardHeader>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                <Tab label="Party" value="1"/>
                                <Tab label="Talents" value="2"/>
                                <Tab label="Skills" value="3"/>
                            </TabList>
                        </Grid>
                        <TabPanel value="1">{renderPartyDashboard()}</TabPanel>
                        <TabPanel value="2">{renderTalentDashboard()}</TabPanel>
                        <TabPanel value="3">{renderSkillDashboard()}</TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    )
}