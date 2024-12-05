import {Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import * as React from "react";
import {useState} from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import PartyCard from "../../party/PartyCard";
import Party from "../../../../models/campaign/Party";
import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";

interface Props {
    party: Party
    npcs: SingleNonPlayerCharacter[]
}

export default function EncounterCard(props: Props) {
    const {party, npcs} = props;
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Card>
            <CenteredCardHeader title={'Encounters'}/>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                {/*<Tab label="Settings" value="1"/>*/}
                                <Tab label="Party" value="1"/>
                                <Tab label="Enemy NPC" value="2"/>
                            </TabList>
                        </Grid>
                        <TabPanel value="1">
                            <PartyCard party={party}/>
                        </TabPanel>
                        <TabPanel value="2">

                        </TabPanel>
                        <TabPanel value="3">
                        </TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    );
}