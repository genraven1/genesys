import { Route, Routes } from 'react-router-dom';
import PlayerView from './actor/player/PlayerView';
import ViewAllPlayers from './actor/player/ViewAllPlayers';
import AllTalentsView from './talents/AllTalentsViewTable';
import TalentView from './talents/TalentView';
import {ActorPath} from "../services/ActorService";
import NemesisView from "./actor/npc/nemesis/NemesisView";

export default function MainPage() {

  return (
    <Routes>
      <Route path='/talents' element={<AllTalentsView />} />
      <Route path='/talents/:name' element={<TalentView />} />
      <Route path={ActorPath.Player} element={<ViewAllPlayers />} />
      <Route path={ActorPath.Player + ':name'} element={<PlayerView />} />
      <Route path={ActorPath.Nemesis + ':name'} element={<NemesisView />} />
    </Routes>
  )
}