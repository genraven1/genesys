import { Route, Routes } from 'react-router-dom';
import PlayerView from './actor/player/PlayerView';
import ViewAllPlayers from './actor/player/ViewAllPlayers';
import AllTalentsView from './talents/AllTalentsViewTable';
import TalentView from './talents/TalentView';

export default function MainPage() {

  return (
    <Routes>
      <Route path='/talents' element={<AllTalentsView />} />
      <Route path='/talents/:name' element={<TalentView />} />
      <Route path='/actors/players' element={<ViewAllPlayers />} />
      <Route path='/actors/players/:name' element={<PlayerView />} />
    </Routes>
  )
}