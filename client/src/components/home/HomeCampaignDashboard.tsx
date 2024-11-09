import {Button, Card, CardActions, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import {useFetchCurrentCampaign} from "../campaign/CampaignWorkflow";
import {useState} from "react";
import MainDashboard from "./MainDashboard";
import ActorDashboard from "./ActorDashboard";
import LoreDashboard from "./LoreDashboard";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import CampaignDialog from "../campaign/CampaignDialog";
import CampaignPage from "../campaign/CampaignPage";
import CampaignSelectionDialog from "../campaign/selection/CampaignSelectionDialog";

export default function HomeCampaignDashboard() {
    const campaign = useFetchCurrentCampaign();
    const [value, setValue] = useState('1');
    const [openCampaignSelectionDialog, setOpenCampaignSelectionDialog] = useState(false);
    const [openCampaignCreationDialog, setOpenCampaignCreationDialog] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    const getSubHeader = () => {
        return campaign ? campaign?.name! : 'No Campaign Selected';
    }

    const renderButton = () => {
        return campaign ? <Button color='primary' variant='contained'
                                  onClick={(): void => setOpenCampaignSelectionDialog(true)}>Change Campaign</Button> :
            <Button color='primary' variant='contained'
                    onClick={(): void => setOpenCampaignCreationDialog(true)}>Create Campaign</Button>;
    }

    return (
        <Card  sx={{width: 1}}>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Campaign Dashboard'}
                subheader={getSubHeader()}>
            </CardHeader>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                <Tab label="Default" value="1"/>
                                <Tab label="Actor" value="2"/>
                                <Tab label="Lore" value="3"/>
                                <Tab label="Campaign" value="4"/>
                            </TabList>
                        </Grid>
                        <TabPanel value="1">
                            <MainDashboard/>
                        </TabPanel>
                        <TabPanel value="2">
                            <ActorDashboard/>
                        </TabPanel>
                        <TabPanel value="3">
                            <LoreDashboard/>
                        </TabPanel>
                        <TabPanel value="4">
                            <CampaignPage campaign={campaign}/>
                        </TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container justifyContent={'center'}>
                    {renderButton()}
                </Grid>
            </CardActions>
            {openCampaignSelectionDialog && <CampaignSelectionDialog open={openCampaignSelectionDialog}
                                                                     onClose={(): void => setOpenCampaignSelectionDialog(false)}
                                                                     current={campaign}/>}
            {openCampaignCreationDialog && <CampaignDialog open={openCampaignCreationDialog}
                                                           onClose={(): void => setOpenCampaignCreationDialog(false)}/>}
        </Card>
    );
}