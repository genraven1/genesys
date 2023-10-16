import NonPlayerCharacter from "../../../../models/actor/npc/NonPlayerCharacter";
import {Button, Card, CardContent, Grid} from "@mui/material";
import * as React from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Fragment, useState} from "react";
import ViewNonPlayerCharacterWeaponTable from "./weapon/ViewNonPlayerCharacterWeaponTable";
import CreateNonPlayerCharacterWeaponDialog from "./weapon/CreateNonPlayerCharacterWeaponDialog";
import WeaponSelectionDialog from "../../common/equipment/WeaponSelectionDialog";
import ViewNonPlayerCharacterArmorTable from "./armor/ViewNonPlayerCharacterArmorTable";
import ArmorSelectionDialog from "../../common/equipment/ArmorSelectionDialog";
import CreateArmorDialog from "./armor/CreateArmorDialog";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";

interface Props {
    npc: NonPlayerCharacter
}
export default function NonPlayerCharacterEquipmentCard(props: Props): JSX.Element {
    const {npc} = props
    const [value, setValue] = useState('1')
    const [openCreateWeaponDialog, setOpenCreateWeaponDialog] = useState(false)
    const [openCreateArmorDialog, setOpenCreateArmorDialog] = useState(false)
    const [openAddWeaponDialog, setOpenAddWeaponDialog] = useState(false)
    const [openSelectArmorDialog, setOpenSelectArmorDialog] = useState(false)

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const renderWeaponsTab = (): JSX.Element => {
        return (
            <Fragment>
                {renderWeaponsTable()}
                <Button color='primary' variant='contained' onClick={(): void => setOpenCreateWeaponDialog(true)}>Create Weapon</Button>
                {openCreateWeaponDialog && <CreateNonPlayerCharacterWeaponDialog npc={npc} open={openCreateWeaponDialog} onClose={(): void => setOpenCreateWeaponDialog(false)}/>}
                <Button color='primary' variant='contained' onClick={(): void => setOpenAddWeaponDialog(true)}>Add Weapon</Button>
                {openAddWeaponDialog && <WeaponSelectionDialog actor={npc} open={openAddWeaponDialog} onClose={(): void => setOpenAddWeaponDialog(false)}/>}
            </Fragment>
        )
    }

    const renderWeaponsTable = (): JSX.Element => {
        if (npc?.weapons!!.length === 0) {
            return <GenesysDescriptionTypography text={'None'}/>
        }
        return <ViewNonPlayerCharacterWeaponTable weapons={npc?.weapons!!} npc={npc!!} />
    }

    const renderArmorTab = (): JSX.Element => {
        return (
            <Fragment>
                {renderArmorTable()}
                <Button color='primary' variant='contained' onClick={(): void => setOpenCreateArmorDialog(true)}>Create Armor</Button>
                {openCreateArmorDialog && <CreateArmorDialog actor={npc} open={openCreateArmorDialog} onClose={(): void => setOpenCreateArmorDialog(false)}/>}
                <Button color='primary' variant='contained' onClick={(): void => setOpenSelectArmorDialog(true)}>Add Armor</Button>
                {openSelectArmorDialog && <ArmorSelectionDialog actor={npc} open={openSelectArmorDialog} onClose={(): void => setOpenSelectArmorDialog(false)}/>}
            </Fragment>
        )
    }

    const renderArmorTable = (): JSX.Element => {
        if (npc?.armor!!.length === 0) {
            return <GenesysDescriptionTypography text={'None'}/>
        }
        return <ViewNonPlayerCharacterArmorTable armor={npc?.armor!!}/>
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
        if (npc?.gear!!.length === 0) {
            return <GenesysDescriptionTypography text={'None'}/>
        }
        return <Fragment/>
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Equipment'}/>
            <CardContent>
                <Grid sx={{ width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{ borderBottom: 1, borderColor: 'divider' }}>
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