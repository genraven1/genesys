import {Button, Card, CardContent, Grid} from "@mui/material";
import * as React from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Fragment, useState} from "react";
import {useLocation} from "react-router-dom";
import GenesysDescriptionTypography from "../../../../common/typography/GenesysDescriptionTypography";
import ViewNonPlayerCharacterWeaponTable from "../../equipment/weapon/ViewNonPlayerCharacterWeaponTable";
import CreateRivalWeaponDialog from "./weapon/CreateRivalWeaponDialog";
import RivalWeaponSelectionDialog from "./weapon/RivalWeaponSelectionDialog";
import ViewNonPlayerCharacterArmorTable from "../../equipment/armor/ViewNonPlayerCharacterArmorTable";
import CenteredCardHeader from "../../../../common/card/CenteredCardHeader";
import Rival from "../../../../../models/actor/npc/Rival";
import CreateRivalArmorDialog from "./armor/CreateRivalArmorDialog";
import ArmorSelectionDialog from "../../../common/equipment/ArmorSelectionDialog";
import ArmorEquipDialog from "./armor/ArmorEquipDialog";
import RivalArmorTable from "../../minion/equipment/armor/RivalArmorTable";

interface Props {
    rival: Rival
}

export default function RivalEquipmentCard(props: Props) {
    const {rival} = props
    const [value, setValue] = useState('1')
    const [openCreateWeaponDialog, setOpenCreateWeaponDialog] = useState(false)
    const [openAddWeaponDialog, setOpenAddWeaponDialog] = useState(false)
    const pathname = useLocation().pathname

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const renderWeaponsTab = () => {
        return (
            <Fragment>
                {renderWeaponsTable()}
                {renderWeaponTableButtons()}
            </Fragment>
        )
    }

    const renderWeaponsTable = () => {
        if (rival.weapons === undefined || rival.weapons.length === 0) {
            return <GenesysDescriptionTypography text={'None'}/>
        }
        return <ViewNonPlayerCharacterWeaponTable weapons={rival?.weapons!!} npc={rival!!}/>
    }

    const renderWeaponTableButtons = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenCreateWeaponDialog(true)}>Create
                        Weapon</Button>
                    {openCreateWeaponDialog &&
                        <CreateRivalWeaponDialog rival={rival} open={openCreateWeaponDialog}
                                                 onClose={(): void => setOpenCreateWeaponDialog(false)}/>}
                    <Button color='primary' variant='contained' onClick={(): void => setOpenAddWeaponDialog(true)}>Add
                        Weapon</Button>
                    {openAddWeaponDialog && <RivalWeaponSelectionDialog rival={rival} open={openAddWeaponDialog}
                                                                        onClose={(): void => setOpenAddWeaponDialog(false)}/>}
                </Fragment>
            )
        } else {
            return <Fragment/>
        }
    }

    const addGear = () => {

    }

    const renderGearTab = () => {
        return (
            <Fragment>
                {renderGearTable()}
                <Button color='primary' variant='contained' onClick={addGear}>Add Gear</Button>
            </Fragment>
        )
    }

    const renderGearTable = () => {
        if (rival.gear === undefined || rival.gear.length === 0) {
            return <GenesysDescriptionTypography text={'None'}/>
        }
        return <Fragment/>
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Equipment'}/>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                <Tab label="Weapons" value="1"/>
                                <Tab label="Armor" value="2"/>
                                <Tab label="Gear" value="3"/>
                            </TabList>
                        </Grid>
                        <TabPanel value="1">{renderWeaponsTab()}</TabPanel>
                        <TabPanel value="2">
                            <RivalArmorTable rival={rival}/>
                        </TabPanel>
                        <TabPanel value="3">{renderGearTab()}</TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    )
}