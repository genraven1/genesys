import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Fragment, useState} from "react";
import Player from "../../../../models/actor/player/Player";
import ViewPlayerWeaponTable from "./ViewPlayerWeaponTable";
import WeaponSelectionDialog from "../../common/equipment/WeaponSelectionDialog";
import ViewPlayerArmorTable from "./ViewPlayerArmorTable";
import ArmorSelectionDialog from "../../common/equipment/ArmorSelectionDialog";

interface Props {
    player: Player
}
export default function PlayerEquipmentCard(props: Props): JSX.Element {
    const {player} = props
    const [value, setValue] = useState('1')
    const [openSelectWeaponDialog, setOpenSelectWeaponDialog] = useState(false)
    const [openSelectArmorDialog, setOpenSelectArmorDialog] = useState(false)

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const renderWeaponsTab = (): JSX.Element => {
        return (
            <Fragment>
                {renderWeaponsTable()}
                <Button color='primary' variant='contained' onClick={(): void => setOpenSelectWeaponDialog(true)}>Add Weapon</Button>
                {openSelectWeaponDialog && <WeaponSelectionDialog actor={player} open={openSelectWeaponDialog} onClose={(): void => setOpenSelectWeaponDialog(false)}/>}
            </Fragment>
        )
    }

    const renderWeaponsTable = (): JSX.Element => {
        if (player?.weapons!!.length === 0) {
            return <Typography style={{textAlign:'center'}}>None</Typography>
        }
        return <ViewPlayerWeaponTable weapons={player?.weapons!!} brawn={player?.brawn?.current!!} />
    }

    const renderArmorTab = (): JSX.Element => {
        return (
            <Fragment>
                {renderArmorTable()}
                <Button color='primary' variant='contained' onClick={(): void => setOpenSelectArmorDialog(true)}>Add Armor</Button>
                {openSelectArmorDialog && <ArmorSelectionDialog actor={player} open={openSelectArmorDialog} onClose={(): void => setOpenSelectArmorDialog(false)}/>}
            </Fragment>
        )
    }

    const renderArmorTable = (): JSX.Element => {
        if (player?.armor!!.length === 0) {
            return <Typography style={{textAlign:'center'}}>None</Typography>
        }
        return <ViewPlayerArmorTable armor={player?.armor!!}/>
    }

    const addGear = () => {

    }

    const renderGearTab = (): JSX.Element => {
        return (
            <Fragment>
                {/*{renderGearTable()}*/}
                <Button color='primary' variant='contained' onClick={addGear}>Add Gear</Button>
            </Fragment>
        )
    }

    const renderGearTable = (): JSX.Element => {
        if (player?.gear!!.length === 0) {
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