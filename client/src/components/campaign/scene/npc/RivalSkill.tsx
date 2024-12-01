import {Button, Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import {useState} from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import * as React from "react";
import Rival from "../../../../models/actor/npc/Rival";
import SingleNonPlayerCharacterSkillCard from "../../npc/skill/SingleNonPlayerCharacterSkillCard";
import AddRivalToSceneDialog from "./AddRivalToSceneDialog";

interface Props {
    rivals: Rival[]
}

export default function RivalSkill(props: Props) {
    const {rivals} = props;
    const [value, setValue] = useState('1');
    const [addRivalDialog, setAddRivalDialog] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    if (!rivals) {
        return (
            <Card>
                <Button color='primary' variant='contained' onClick={(): void => setAddRivalDialog(true)}>Add Rival</Button>
                {addRivalDialog && <AddRivalToSceneDialog open={addRivalDialog}
                                                                  onClose={(): void => setAddRivalDialog(false)}/>}
            </Card>
        )
    }

    return (
        <Card>
            <CenteredCardHeader title={'Rivals'}/>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                {rivals.map((rival, index) => (
                                    <Tab label={rival.name} value={index}/>
                                ))}
                            </TabList>
                        </Grid>
                        {rivals.map((rival, index) => (
                            <TabPanel value={String(index)}>
                                <SingleNonPlayerCharacterSkillCard actor={rival}/>
                            </TabPanel>
                        ))}
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    );
}