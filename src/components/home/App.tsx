import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import NavBar from '../navigation/NavBar';
import {createTheme, ThemeProvider} from '@mui/material';
import {LorePath, Path} from '../../services/Path';
import AllTalentsView from '../talents/AllTalentsViewTable';
import ViewAllPlayers from '../actor/player/ViewAllPlayers';
import PlayerView from '../actor/player/PlayerView';
import NemesisEdit from '../actor/npc/nemesis/NemesisEdit';
import NemesisView from '../actor/npc/nemesis/NemesisView';
import AllNemesesView from '../actor/npc/nemesis/ViewAllNemeses';
import ViewAllSkills from '../skills/ViewAllSkills';
import AllRivalsView from '../actor/npc/rival/ViewAllRivals';
import RivalView from '../actor/npc/rival/RivalView';
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
import ViewAllWeapon from "../equipment/weapon/ViewAllWeapon";
import WeaponWorkflow from "../equipment/weapon/WeaponWorkflow";

export default function App() {

    return (
        <ThemeProvider theme={createTheme({palette: {mode: 'dark'}})} >
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route path={Path.Home} element={<Dashboard/>} />
                    <Route path={Path.Talent} element={<AllTalentsView />} />
                    <Route path={Path.Talent + ':name/view'} element={<TalentWorkflow />} />
                    <Route path={Path.Talent + ':name/edit'} element={<TalentWorkflow />} />
                    <Route path={Path.Player} element={<ViewAllPlayers />} />
                    <Route path={Path.Player + ':name'} element={<PlayerView />} />
                    <Route path={Path.Nemesis + ':name/edit'} element={<NemesisEdit />} />
                    <Route path={Path.Nemesis + ':name/view'} element={<NemesisView />} />
                    <Route path={Path.Nemesis} element={<AllNemesesView />} />
                    <Route path={Path.Skills} element={<ViewAllSkills />} />
                    <Route path={Path.Skills + ':name/edit'} element={<SkillWorkflow />} />
                    <Route path={Path.Skills + ':name/view'} element={<SkillWorkflow />} />
                    <Route path={Path.Rival} element={<AllRivalsView />} />
                    <Route path={Path.Rival + ':name'} element={<RivalView />} />
                    <Route path={Path.Armor} element={<ViewAllArmor/>} />
                    <Route path={Path.Armor + ':name/edit'} element={<ArmorWorkflow/>} />
                    <Route path={Path.Armor + ':name/view'} element={<ArmorWorkflow/>} />
                    <Route path={Path.Weapon} element={<ViewAllWeapon/>} />
                    <Route path={Path.Weapon + ':name/edit'} element={<WeaponWorkflow/>} />
                    <Route path={Path.Weapon + ':name/view'} element={<WeaponWorkflow/>} />
                    // Lore Routes
                    <Route path={Path.Lore} element={<ViewAllLore />} />
                    <Route path={LorePath.Organization} element={<LoreMenu lore={LoreType.ORGANIZATION} path={LorePath.Organization}/>} />
                    <Route path={LorePath.Organization + ':name/view'} element={<OrganizationWorkflow/>} />
                    <Route path={LorePath.Organization + ':name/edit'} element={<OrganizationWorkflow/>} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}