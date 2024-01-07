import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import NavBar from '../navigation/NavBar';
import {createTheme, ThemeProvider} from '@mui/material';
import {ActorPath, EquipmentPath, LorePath, Path} from '../../services/Path';
import ViewAllPlayers from '../actor/player/ViewAllPlayers';
import AllNemesesView from '../actor/npc/nemesis/ViewAllNemeses';
import AllRivalsView from '../actor/npc/rival/ViewAllRivals';
import * as React from 'react';
import LoreMenu from "../lore/common/LoreMenu";
import {LoreType} from "../../models/lore/Lore";
import {ViewAllLore} from "../lore/common/ViewAllLore";
import OrganizationWorkflow from "../lore/organization/OrganizationWorkflow";
import TalentWorkflow from "../talents/TalentWorkflow";
import SkillWorkflow from "../skills/SkillWorkflow";
import ArmorWorkflow from "../equipment/armor/ArmorWorkflow";
import WeaponWorkflow from "../equipment/weapon/WeaponWorkflow";
import GearWorkflow from "../equipment/gear/GearWorkflow";
import NemesisWorkflow from "../actor/npc/nemesis/NemesisWorkflow";
import PlayerWorkflow from "../actor/player/PlayerWorkflow";
import RivalWorkflow from "../actor/npc/rival/RivalWorkflow";
import MinionWorkflow from "../actor/npc/minion/MinionWorkflow";
import SettingWorkflow from "../setting/SettingWorkflow";
import ViewAllActors from "../actor/ViewAllActors";
import QualityWorkflow from "../qualities/QualityWorkflow";
import ViewAllNonPlayerCharacters from "../actor/npc/ViewAllNonPlayerCharacters";
import MainDashboard from "./MainDashboard";

export default function App() {

    return (
        <ThemeProvider theme={createTheme({palette: {mode: 'light'}})}>
            <HashRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home"/>}/>
                    <Route path={Path.Home} element={<MainDashboard/>}/>

                    <Route path={Path.Scene} element={<SettingWorkflow/>}/>
                    <Route path={Path.Scene + ':id/view'} element={<SettingWorkflow/>}/>
                    <Route path={Path.Scene + ':id/edit'} element={<SettingWorkflow/>}/>

                    <Route path={Path.Setting} element={<SettingWorkflow/>}/>
                    <Route path={Path.Setting + ':id/view'} element={<SettingWorkflow/>}/>
                    <Route path={Path.Setting + ':id/edit'} element={<SettingWorkflow/>}/>

                    <Route path={Path.Talent} element={<TalentWorkflow/>}/>
                    <Route path={Path.Talent + ':id/view'} element={<TalentWorkflow/>}/>
                    <Route path={Path.Talent + ':id/edit'} element={<TalentWorkflow/>}/>

                    <Route path={Path.Qualities} element={<QualityWorkflow/>}/>
                    <Route path={Path.Qualities + ':id/view'} element={<QualityWorkflow/>}/>
                    <Route path={Path.Qualities + ':id/edit'} element={<QualityWorkflow/>}/>

                    <Route path={Path.Skills} element={<SkillWorkflow/>}/>
                    <Route path={Path.Skills + ':id/edit'} element={<SkillWorkflow/>}/>
                    <Route path={Path.Skills + ':id/view'} element={<SkillWorkflow/>}/>

                    {/*Actor Routes*/}
                    <Route path={ActorPath.Actor} element={<ViewAllActors/>}/>
                    <Route path={ActorPath.Npc} element={<ViewAllNonPlayerCharacters/>}/>

                    <Route path={ActorPath.Player} element={<ViewAllPlayers/>}/>
                    <Route path={ActorPath.Player + ':id/edit'} element={<PlayerWorkflow/>}/>
                    <Route path={ActorPath.Player + ':id/view'} element={<PlayerWorkflow/>}/>

                    <Route path={ActorPath.Nemesis} element={<AllNemesesView/>}/>
                    <Route path={ActorPath.Nemesis + ':id/edit'} element={<NemesisWorkflow/>}/>
                    <Route path={ActorPath.Nemesis + ':id/view'} element={<NemesisWorkflow/>}/>

                    <Route path={ActorPath.Rival} element={<AllRivalsView/>}/>
                    <Route path={ActorPath.Rival + ':id/edit'} element={<RivalWorkflow/>}/>
                    <Route path={ActorPath.Rival + ':id/view'} element={<RivalWorkflow/>}/>

                    <Route path={ActorPath.Minion} element={<MinionWorkflow/>}/>
                    <Route path={ActorPath.Minion + ':id/edit'} element={<MinionWorkflow/>}/>
                    <Route path={ActorPath.Minion + ':id/view'} element={<MinionWorkflow/>}/>

                    {/*Equipment Routes*/}
                    <Route path={EquipmentPath.Armor} element={<ArmorWorkflow/>}/>
                    <Route path={EquipmentPath.Armor + ':id/edit'} element={<ArmorWorkflow/>}/>
                    <Route path={EquipmentPath.Armor + ':id/view'} element={<ArmorWorkflow/>}/>

                    <Route path={EquipmentPath.Weapon} element={<WeaponWorkflow/>}/>
                    <Route path={EquipmentPath.Weapon + ':id/edit'} element={<WeaponWorkflow/>}/>
                    <Route path={EquipmentPath.Weapon + ':id/view'} element={<WeaponWorkflow/>}/>

                    <Route path={EquipmentPath.Gear} element={<GearWorkflow/>}/>
                    <Route path={EquipmentPath.Gear + ':id/edit'} element={<GearWorkflow/>}/>
                    <Route path={EquipmentPath.Gear + ':id/view'} element={<GearWorkflow/>}/>

                    {/*Lore Routes*/}
                    <Route path={Path.Lore} element={<ViewAllLore/>}/>

                    <Route path={LorePath.Organization}
                           element={<LoreMenu lore={LoreType.ORGANIZATION} path={LorePath.Organization}/>}/>
                    <Route path={LorePath.Organization + ':id/view'} element={<OrganizationWorkflow/>}/>
                    <Route path={LorePath.Organization + ':id/edit'} element={<OrganizationWorkflow/>}/>
                </Routes>
            </HashRouter>
        </ThemeProvider>
    )
}