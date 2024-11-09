import Campaign from "../../models/campaign/Campaign";
import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import ViewCampaignTalents from "./talents/ViewCampaignTalents";
import ViewCampaignSkills from "./skill/ViewCampaignSkills";
import PartyCard from "./party/PartyCard";
import CampaignCareers from "./career/CampaignCareers";
import CampaignArchetypes from "./archetype/CampaignArchetypes";
import CampaignWeapon from "./equipment/weapon/CampaignWeapon";
import CampaignArmor from "./equipment/armor/CampaignArmor";
import CampaignGear from "./equipment/gear/CampaignGear";

interface Props {
    campaign: Campaign
}

export default function CampaignPage(props: Props) {
    const {campaign} = props;
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
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
                                <Tab label='Archetypes' value='4'/>
                                <Tab label='Careers' value='5'/>
                                <Tab label='Weapons' value='6'/>
                                <Tab label='Armors' value='7'/>
                                <Tab label='Gear' value='8'/>
                            </TabList>
                        </Grid>
                        <TabPanel value="1">
                            <PartyCard party={campaign.party}/>
                        </TabPanel>
                        <TabPanel value="2">
                            <ViewCampaignTalents/>
                        </TabPanel>
                        <TabPanel value="3">
                            <ViewCampaignSkills/>
                        </TabPanel>
                        <TabPanel value="4">
                            <CampaignArchetypes/>
                        </TabPanel>
                        <TabPanel value="5">
                            <CampaignCareers/>
                        </TabPanel>
                        <TabPanel value="6">
                            <CampaignWeapon/>
                        </TabPanel>
                        <TabPanel value="7">
                            <CampaignArmor/>
                        </TabPanel>
                        <TabPanel value="8">
                            <CampaignGear/>
                        </TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    )
}