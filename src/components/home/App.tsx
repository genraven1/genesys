import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import NavBar from '../navigation/NavBar';
import {createTheme, ThemeProvider} from '@mui/material';
import {ActorPath, EquipmentPath, LorePath, Path} from '../../services/Path';
import AllTalentsView from '../talents/AllTalentsViewTable';
import ViewAllPlayers from '../actor/player/ViewAllPlayers';
import AllNemesesView from '../actor/npc/nemesis/ViewAllNemeses';
import ViewAllSkills from '../skills/ViewAllSkills';
import AllRivalsView from '../actor/npc/rival/ViewAllRivals';
import ViewAllArmor from '../equipment/armor/ViewAllArmor';
import * as React from 'react';
import Dashboard from "./Dashboard";
import LoreMenu from "../lore/common/LoreMenu";
import {LoreType} from "../../models/lore/Lore";
import {ViewAllLore} from "../lore/common/ViewAllLore";
import OrganizationWorkflow from "../lore/organization/OrganizationWorkflow";
import TalentWorkflow from "../talents/TalentWorkflow";
import SkillWorkflow from "../skills/SkillWorkflow";
import ArmorWorkflow from "../equipment/armor/ArmorWorkflow";
import WeaponWorkflow from "../equipment/weapon/WeaponWorkflow";
import GearWorkflow from "../equipment/gear/GearWorkflow";
import ViewAllGear from "../equipment/gear/ViewAllGear";
import NemesisWorkflow from "../actor/npc/nemesis/NemesisWorkflow";
import PlayerWorkflow from "../actor/player/PlayerWorkflow";
import RivalWorkflow from "../actor/npc/rival/RivalWorkflow";
import AllMinionsView from "../actor/npc/minion/ViewAllMinion";
import MinionWorkflow from "../actor/npc/minion/MinionWorkflow";
import SettingWorkflow from "../setting/SettingWorkflow";
import ViewAllSettings from "../setting/ViewAllSettings";
import ViewAllActors from "../actor/ViewAllActors";

export default function App() {

    return (
        <ThemeProvider theme={createTheme({palette: {mode: 'light'}})} >
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route path={Path.Home} element={<Dashboard/>} />
                    <Route path={Path.Setting} element={<ViewAllSettings />} />
                    <Route path={Path.Setting + ':name/view'} element={<SettingWorkflow />} />
                    <Route path={Path.Setting + ':name/edit'} element={<SettingWorkflow />} />
                    <Route path={Path.Talent} element={<TalentWorkflow />} />
                    <Route path={Path.Talent + ':id/view'} element={<TalentWorkflow />} />
                    <Route path={Path.Talent + ':id/edit'} element={<TalentWorkflow />} />
                    <Route path={Path.Skills} element={<ViewAllSkills />} />
                    <Route path={Path.Skills + ':name/edit'} element={<SkillWorkflow />} />
                    <Route path={Path.Skills + ':name/view'} element={<SkillWorkflow />} />
                    {/*Actor Routes*/}
                    <Route path={ActorPath.Actor} element={<ViewAllActors />} />

                    <Route path={ActorPath.Player} element={<ViewAllPlayers />} />
                    <Route path={ActorPath.Player + ':name/edit'} element={<PlayerWorkflow />} />
                    <Route path={ActorPath.Player + ':name/view'} element={<PlayerWorkflow />} />

                    <Route path={ActorPath.Nemesis} element={<AllNemesesView />} />
                    <Route path={ActorPath.Nemesis + ':name/edit'} element={<NemesisWorkflow />} />
                    <Route path={ActorPath.Nemesis + ':name/view'} element={<NemesisWorkflow />} />

                    <Route path={ActorPath.Rival} element={<AllRivalsView />} />
                    <Route path={ActorPath.Rival + ':name/edit'} element={<RivalWorkflow />} />
                    <Route path={ActorPath.Rival + ':name/view'} element={<RivalWorkflow />} />

                    <Route path={ActorPath.Minion} element={<AllMinionsView />} />
                    <Route path={ActorPath.Minion + ':name/edit'} element={<MinionWorkflow />} />
                    <Route path={ActorPath.Minion + ':name/view'} element={<MinionWorkflow />} />
                    {/*Equipment Routes*/}
                    <Route path={EquipmentPath.Armor} element={<ViewAllArmor/>} />
                    <Route path={EquipmentPath.Armor + ':name/edit'} element={<ArmorWorkflow/>} />
                    <Route path={EquipmentPath.Armor + ':name/view'} element={<ArmorWorkflow/>} />
                    <Route path={EquipmentPath.Weapon} element={<WeaponWorkflow/>} />
                    <Route path={EquipmentPath.Weapon + ':name/edit'} element={<WeaponWorkflow/>} />
                    <Route path={EquipmentPath.Weapon + ':name/view'} element={<WeaponWorkflow/>} />
                    <Route path={EquipmentPath.Gear} element={<ViewAllGear/>} />
                    <Route path={EquipmentPath.Gear + ':name/edit'} element={<GearWorkflow/>} />
                    <Route path={EquipmentPath.Gear + ':name/view'} element={<GearWorkflow/>} />
                    {/*Lore Routes*/}
                    <Route path={Path.Lore} element={<ViewAllLore />} />
                    <Route path={LorePath.Organization} element={<LoreMenu lore={LoreType.ORGANIZATION} path={LorePath.Organization}/>} />
                    <Route path={LorePath.Organization + ':name/view'} element={<OrganizationWorkflow/>} />
                    <Route path={LorePath.Organization + ':name/edit'} element={<OrganizationWorkflow/>} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}