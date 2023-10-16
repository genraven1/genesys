import NonPlayerCharacter from "../../../../models/actor/npc/NonPlayerCharacter";
import {Card, CardContent, Grid} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Fragment, useState} from "react";
import ViewNonPlayerCharacterWeaponTable from "./weapon/ViewNonPlayerCharacterWeaponTable";
import ViewNonPlayerCharacterArmorTable from "./armor/ViewNonPlayerCharacterArmorTable";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";

interface Props {
    npc: NonPlayerCharacter
}
export default function NonPlayerCharacterEquipmentCard(props: Props): JSX.Element {
    const {npc} = props
    const [value, setValue] = useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const renderWeaponsTab = (): JSX.Element => {
        if (npc?.weapons!!.length === 0) {
            return <Typography style={{textAlign:'center'}}>None</Typography>
        }
        return <ViewNonPlayerCharacterWeaponTable weapons={npc?.weapons!!} npc={npc!!} />
    }

    const renderArmorTab = (): JSX.Element => {
        if (npc?.armor!!.length === 0) {
            return <Typography style={{textAlign:'center'}}>None</Typography>
        }
        return <ViewNonPlayerCharacterArmorTable armor={npc?.armor!!}/>
    }

    const renderGearTab = (): JSX.Element => {
        if (npc?.gear!!.length === 0) {
            return <Typography style={{textAlign:'center'}}>None</Typography>
        }
        return <Fragment/>
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Equipment'}/>
            <CardContent>
                <Grid sx={{ width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{ borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                <Tab label="Weapons" value="1" />
                                <Tab label="Armor" value="2" />
                                <Tab label="Gear" value="3" />
                            </TabList>
                        </Grid>
                        <TabPanel value="1">{renderWeaponsTab()}</TabPanel>
                        <TabPanel value="2">{renderArmorTab()}</TabPanel>
                        <TabPanel value="3">{renderGearTab()}</TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    )
}