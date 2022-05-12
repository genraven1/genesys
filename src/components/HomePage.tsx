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

      {/* <Route path='/npcs/minions' element={<MinionTable />} />
      <Route path='/npcs/minions/new' element={<CreateMinion minion={selectedMinion.current} />} />
      <Route path='/equipment/armor' element={<MinionTable />} />
      <Route path='/equipment/armor/new' element={<CreateArmor newArmor={selectedArmor.current} />} />
      <Route path='/npcs/minions/:id' element={<MinionView />} /> */}
    </Routes>
  )
}