import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Fragment, useState} from "react";
import Player from "../../../../models/actor/player/Player";
import ViewPlayerArmorTable from "./ViewPlayerArmorTable";
import ViewPlayerWeaponTable from "./ViewPlayerWeaponTable";

interface Props {
    player: Player
}
export default function ViewPlayerEquipmentCard(props: Props): JSX.Element {
    const {player} = props
    const [value, setValue] = useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const renderWeaponsTab = (): JSX.Element => {
        if (player?.weapons!!.length === 0) {
            return <Typography style={{textAlign:'center'}}>None</Typography>
        }
        return <ViewPlayerWeaponTable weapons={player?.weapons!!} player={player!!}/>
    }

    const renderArmorTab = (): JSX.Element => {
        if (player?.weapons!!.length === 0) {
            return <Typography style={{textAlign:'center'}}>None</Typography>
        }
        return <ViewPlayerArmorTable armor={player?.armor!!}/>
    }

    const renderGearTab = (): JSX.Element => {
        if (player?.weapons!!.length === 0) {
            return <Typography style={{textAlign:'center'}}>None</Typography>
        }
        return <Fragment/>
    }

    return (
        <Card sx={{"width": 1}}>
            <CardHeader title={'Equipment'} style={{textAlign:'center'}}/>
            <CardContent>
                <Grid sx={{ width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
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