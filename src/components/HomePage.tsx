import { Route, Routes } from 'react-router-dom';
import PlayerView from './actor/player/PlayerView';
import ViewAllPlayers from './actor/player/ViewAllPlayers';
import AllTalentsView from './talents/AllTalentsViewTable';
import TalentView from './talents/TalentView';
import NemesisView from './actor/npc/nemesis/NemesisView';
import {Path} from '../services/Path';
import SkillView from './skills/SkillView';
import ViewAllSkills from "./skills/ViewAllSkills";

export default function MainPage() {

  return (
    <Routes>
      <Route path={Path.Talent} element={<AllTalentsView />} />
      <Route path={Path.Talent + ':name'} element={<TalentView />} />
      <Route path={Path.Player} element={<ViewAllPlayers />} />
      <Route path={Path.Player + ':name'} element={<PlayerView />} />
      <Route path={Path.Nemesis + ':name'} element={<NemesisView />} />
      <Route path={Path.Skills} element={<ViewAllSkills />} />
      <Route path={Path.Skills + ':name'} element={<SkillView />} />
    </Routes>
  )
}