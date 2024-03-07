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

interface Props {
    rival: Rival
}

export default function RivalEquipmentCard(props: Props): JSX.Element {
    const {rival} = props
    const [value, setValue] = useState('1')
    const [openCreateWeaponDialog, setOpenCreateWeaponDialog] = useState(false)
    const [openCreateArmorDialog, setOpenCreateArmorDialog] = useState(false)
    const [openAddWeaponDialog, setOpenAddWeaponDialog] = useState(false)
    const [openSelectArmorDialog, setOpenSelectArmorDialog] = useState(false)
    const pathname = useLocation().pathname

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const renderWeaponsTab = (): JSX.Element => {
        return (
            <Fragment>
                {renderWeaponsTable()}
                {renderWeaponTableButtons()}
            </Fragment>
        )
    }

    const renderWeaponsTable = (): JSX.Element => {
        if (rival.weapons === undefined || rival.weapons.length === 0) {
            return <GenesysDescriptionTypography text={'None'}/>
        }
        return <ViewNonPlayerCharacterWeaponTable weapons={rival?.weapons!!} npc={rival!!}/>
    }

    const renderWeaponTableButtons = (): JSX.Element => {
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

    const renderArmorTab = (): JSX.Element => {
        return (
            <Fragment>
                {renderArmorTable()}
                {renderArmorTableButtons()}
            </Fragment>
        )
    }

    const renderArmorTable = (): JSX.Element => {
        if (rival.armor === undefined || rival.armor.length === 0) {
            return <GenesysDescriptionTypography text={'None'}/>
        }
        return <ViewNonPlayerCharacterArmorTable armor={rival?.armor!!}/>
    }

    const renderArmorTableButtons = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    {/*<Button color='primary' variant='contained' onClick={(): void => setOpenCreateArmorDialog(true)}>Create*/}
                    {/*    Armor</Button>*/}
                    {/*{openCreateArmorDialog && <CreateNemesisArmorDialog nemesis={rival} open={openCreateArmorDialog}*/}
                    {/*                                                    onClose={(): void => setOpenCreateArmorDialog(false)}/>}*/}
                    {/*<Button color='primary' variant='contained' onClick={(): void => setOpenSelectArmorDialog(true)}>Add*/}
                    {/*    Armor</Button>*/}
                    {/*{openSelectArmorDialog && <NemesisArmorSelectionDialog nemesis={rival} open={openSelectArmorDialog}*/}
                    {/*                                                       onClose={(): void => setOpenSelectArmorDialog(false)}/>}*/}
                </Fragment>
            )
        } else {
            return <Fragment/>
        }
    }

    const addGear = () => {

    }

    const renderGearTab = (): JSX.Element => {
        return (
            <Fragment>
                {renderGearTable()}
                <Button color='primary' variant='contained' onClick={addGear}>Add Gear</Button>
            </Fragment>
        )
    }

    const renderGearTable = (): JSX.Element => {
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
                        <TabPanel value="2">{renderArmorTab()}</TabPanel>
                        <TabPanel value="3">{renderGearTab()}</TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    )
}