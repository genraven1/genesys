import MainDashboard from "./MainDashboard"
import {useState} from "react";
import {Card, Grid} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import LoreDashboard from "./LoreDashboard";
import CampaignDashboard from "./CampaignDashboard";
import ActorDashboard from "./ActorDashboard";
import EquipmentDashboard from "./EquipmentDashboard";

export default function HomeDashboard() {
    const [value, setValue] = useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const renderDefaultDashboard = (): JSX.Element => {
        return <MainDashboard/>
    }

    const renderActorDashboard = (): JSX.Element => {
        return <ActorDashboard/>
    }

    const renderEquipmentDashboard = (): JSX.Element => {
        return <EquipmentDashboard/>
    }

    const renderLoreDashboard = (): JSX.Element => {
        return <LoreDashboard/>
    }

    const renderCampaignDashboard = (): JSX.Element => {
        return <CampaignDashboard/>
    }

    return (
        <Card sx={{width: 1}}>
            <Grid sx={{ width: 1}}>
                <TabContext value={value}>
                    <Grid sx={{ borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} centered>
                            <Tab label="Default" value="1"/>
                            <Tab label="Actor" value="2"/>
                            <Tab label="Equipment" value="3"/>
                            <Tab label="Lore" value="4"/>
                            <Tab label="Campaign" value="5"/>
                        </TabList>
                    </Grid>
                    <TabPanel value="1">{renderDefaultDashboard()}</TabPanel>
                    <TabPanel value="2">{renderActorDashboard()}</TabPanel>
                    <TabPanel value="3">{renderEquipmentDashboard()}</TabPanel>
                    <TabPanel value="4">{renderLoreDashboard()}</TabPanel>
                    <TabPanel value="5">{renderCampaignDashboard()}</TabPanel>
                </TabContext>
            </Grid>
        </Card>
    )
}