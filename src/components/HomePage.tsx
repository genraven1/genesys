import { Route, Routes } from 'react-router-dom';
import PlayerView from './actor/player/PlayerView';
import ViewAllPlayers from './actor/player/ViewAllPlayers';
import AllTalentsView from './talents/AllTalentsViewTable';
import TalentView from './talents/TalentView';
import NemesisEdit from './actor/npc/nemesis/NemesisEdit';
import {Path} from '../services/Path';
import SkillView from './skills/SkillView';
import ViewAllSkills from "./skills/ViewAllSkills";
import AllNemesesView from "./actor/npc/nemesis/ViewAllNemeses";
import AllRivalsView from "./actor/npc/rival/ViewAllRivals";
import RivalView from "./actor/npc/rival/RivalView";
import NemesisView from './actor/npc/nemesis/NemesisView';
import ViewAllArmor from "./equipment/armor/ViewAllArmor";

export default function MainPage() {

  return (
      <Routes>
      <Route path={Path.Talent} element={<AllTalentsView />} />
      <Route path={Path.Talent + ':name'} element={<TalentView />} />
      <Route path={Path.Player} element={<ViewAllPlayers />} />
      <Route path={Path.Player + ':name'} element={<PlayerView />} />
      <Route path={Path.Nemesis + ':name/edit'} element={<NemesisEdit />} />
      <Route path={Path.Nemesis + ':name/view'} element={<NemesisView />} />
      <Route path={Path.Nemesis} element={<AllNemesesView />} />
      <Route path={Path.Skills} element={<ViewAllSkills />} />
      <Route path={Path.Skills + ':name'} element={<SkillView />} />
      <Route path={Path.Rival} element={<AllRivalsView />} />
      <Route path={Path.Rival + ':name'} element={<RivalView />} />
      <Route path={Path.Armor} element={<ViewAllArmor/>} />
    </Routes>
  )
}