import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import NavBar from '../navigation/NavBar';
import {createTheme, ThemeProvider} from '@mui/material';
import {ActorPath, CampaignPath, EquipmentPath, LorePath, RootPath} from '../../services/Path';
import ViewAllPlayers from '../actor/player/ViewAllPlayers';
import AllNemesesView from '../actor/npc/nemesis/ViewAllNemeses';
import AllRivalsView from '../actor/npc/rival/ViewAllRivals';
import * as React from 'react';
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
import QualityWorkflow from "../qualities/QualityWorkflow";
import InjuryWorkflow from "../injuries/InjuryWorkflow";
import SpellWorkflow from "../spell/SpellWorkflow";
import CareerWorkflow from "../career/CareerWorkflow";
import ArchetypeWorkflow from "../archetype/ArchetypeWorkflow";
import CampaignWorkflow from "../campaign/CampaignWorkflow";
import SessionWorkflow from "../campaign/session/SessionWorkflow";
import SceneWorkflow from "../campaign/scene/SceneWorkflow";
import HomeCampaignDashboard from "./HomeCampaignDashboard";

export default function App() {

    return (
        <ThemeProvider theme={createTheme({palette: {mode: 'light'}})}>
            <HashRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home"/>}/>
                    <Route path={RootPath.Home} element={<HomeCampaignDashboard/>}/>

                    <Route path={RootPath.Injury} element={<InjuryWorkflow/>}/>
                    <Route path={RootPath.Injury + ':id/view'} element={<InjuryWorkflow/>}/>
                    <Route path={RootPath.Injury + ':id/edit'} element={<InjuryWorkflow/>}/>

                    <Route path={RootPath.Spell} element={<SpellWorkflow/>}/>
                    <Route path={RootPath.Spell + ':name/view'} element={<SpellWorkflow/>}/>
                    <Route path={RootPath.Spell + ':name/edit'} element={<SpellWorkflow/>}/>

                    <Route path={RootPath.Talent} element={<TalentWorkflow/>}/>
                    <Route path={RootPath.Talent + ':id/view'} element={<TalentWorkflow/>}/>
                    <Route path={RootPath.Talent + ':id/edit'} element={<TalentWorkflow/>}/>

                    <Route path={RootPath.Qualities} element={<QualityWorkflow/>}/>
                    <Route path={RootPath.Qualities + ':id/view'} element={<QualityWorkflow/>}/>
                    <Route path={RootPath.Qualities + ':id/edit'} element={<QualityWorkflow/>}/>

                    <Route path={RootPath.Skills} element={<SkillWorkflow/>}/>
                    <Route path={RootPath.Skills + ':id/edit'} element={<SkillWorkflow/>}/>
                    <Route path={RootPath.Skills + ':id/view'} element={<SkillWorkflow/>}/>

                    <Route path={RootPath.Career} element={<CareerWorkflow/>}/>
                    <Route path={RootPath.Career + ':id/edit'} element={<CareerWorkflow/>}/>
                    <Route path={RootPath.Career + ':id/view'} element={<CareerWorkflow/>}/>

                    <Route path={RootPath.Archetype} element={<ArchetypeWorkflow/>}/>
                    <Route path={RootPath.Archetype + ':id/edit'} element={<ArchetypeWorkflow/>}/>
                    <Route path={RootPath.Archetype + ':id/view'} element={<ArchetypeWorkflow/>}/>

                    {/*Actor Routes*/}
                    <Route path={ActorPath.Player} element={<ViewAllPlayers/>}/>
                    <Route path={ActorPath.Player + ':id/edit'} element={<PlayerWorkflow/>}/>
                    <Route path={ActorPath.Player + ':id/view'} element={<PlayerWorkflow/>}/>

                    <Route path={ActorPath.Nemesis} element={<AllNemesesView/>}/>
                    <Route path={ActorPath.Nemesis + ':name/edit'} element={<NemesisWorkflow/>}/>
                    <Route path={ActorPath.Nemesis + ':name/view'} element={<NemesisWorkflow/>}/>

                    <Route path={ActorPath.Rival} element={<AllRivalsView/>}/>
                    <Route path={ActorPath.Rival + ':id/edit'} element={<RivalWorkflow/>}/>
                    <Route path={ActorPath.Rival + ':id/view'} element={<RivalWorkflow/>}/>

                    <Route path={ActorPath.Minion} element={<MinionWorkflow/>}/>
                    <Route path={ActorPath.Minion + ':name/edit'} element={<MinionWorkflow/>}/>
                    <Route path={ActorPath.Minion + ':name/view'} element={<MinionWorkflow/>}/>

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
                    <Route path={RootPath.Lore} element={<ViewAllLore/>}/>

                    <Route path={LorePath.Organization} element={<OrganizationWorkflow/>}/>
                    <Route path={LorePath.Organization + ':name/view'} element={<OrganizationWorkflow/>}/>
                    <Route path={LorePath.Organization + ':name/edit'} element={<OrganizationWorkflow/>}/>

                    {/*Campaign Routes*/}
                    <Route path={CampaignPath.Campaign} element={<CampaignWorkflow/>}/>
                    <Route path={CampaignPath.Campaign + ':id'} element={<CampaignWorkflow/>}/>

                    <Route path={CampaignPath.Campaign + ':campaignName' + CampaignPath.Session} element={<SessionWorkflow/>}/>
                    <Route path={CampaignPath.Campaign + ':campaignName' + CampaignPath.Session + ':sessionName/view'} element={<SessionWorkflow/>}/>
                    <Route path={CampaignPath.Campaign + ':campaignName' + CampaignPath.Session + ':sessionName/edit'} element={<SessionWorkflow/>}/>

                    <Route path={CampaignPath.Campaign + ':campaignName' + CampaignPath.Session + CampaignPath.Scene} element={<SceneWorkflow/>}/>
                    <Route path={CampaignPath.Campaign + ':campaignName' + CampaignPath.Session + CampaignPath.Scene + ':name/view'} element={<SceneWorkflow/>}/>
                    <Route path={CampaignPath.Campaign + ':campaignName' + CampaignPath.Session + CampaignPath.Scene + ':name/edit'} element={<SceneWorkflow/>}/>

                    {/*<Route path={Path.Scene} element={<SceneWorkflow/>}/>*/}
                    {/*<Route path={Path.Scene + ':name/view'} element={<SceneWorkflow/>}/>*/}
                    {/*<Route path={Path.Scene + ':name/edit'} element={<SceneWorkflow/>}/>*/}
                </Routes>
            </HashRouter>
        </ThemeProvider>
    )
}