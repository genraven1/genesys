import Dashboard from "./Dashboard"
import {useState} from "react";
import {Card, Grid} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import LoreDashboard from "./LoreDashboard";
import SceneDashboard from "./SceneDashboard";
import ActorDashboard from "./ActorDashboard";

export default function MainDashboard(): JSX.Element {
    const [value, setValue] = useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const renderDefaultDashboard = (): JSX.Element => {
        return <Dashboard/>
    }

    const renderActorDashboard = (): JSX.Element => {
        return <ActorDashboard/>
    }

    const renderLoreDashboard = (): JSX.Element => {
        return <LoreDashboard/>
    }

    const renderSceneDashboard = (): JSX.Element => {
        return <SceneDashboard/>
    }

    return (
        <Card sx={{width: 1}}>
            <Grid sx={{ width: 1}}>
                <TabContext value={value}>
                    <Grid sx={{ borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} centered>
                            <Tab label="Default" value="1" sx={{width: 1}}/>
                            <Tab label="Actor" value="2" sx={{width: 1}}/>
                            <Tab label="Lore" value="3" sx={{width: 1}}/>
                            <Tab label="Scene" value="4" sx={{width: 1}}/>
                        </TabList>
                    </Grid>
                    <TabPanel value="1">{renderDefaultDashboard()}</TabPanel>
                    <TabPanel value="2">{renderActorDashboard()}</TabPanel>
                    <TabPanel value="3">{renderLoreDashboard()}</TabPanel>
                    <TabPanel value="4">{renderSceneDashboard()}</TabPanel>
                </TabContext>
            </Grid>
        </Card>
    )
}