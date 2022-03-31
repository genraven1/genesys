import { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import Talent from '../models/Talent';
import AllTalentsView from './talents/AllTalentsViewTable';
import CreateTalent from './talents/CreateTalent';
import MinionTable from './npc/minion/MinionTable';
import MinionView from './npc/minion/MinionView';
import CreateMinion from './npc/minion/CreateMinion';
import Minion from '../models/Minion';


export default function MainPage() {
  const selectedTalent = useRef<Talent | null>(null);
  const selectedMinion = useRef<Minion | null>(null);

  return (
    <Routes>
      <Route path='/talents' element={<AllTalentsView />} />
      <Route path='/talents/new' element={<CreateTalent talent={selectedTalent.current} />} />
      <Route path='/npcs/minions' element={<MinionTable />} />
      <Route path='/npcs/minions/new' element={<CreateMinion minion={selectedMinion.current} />} />
      <Route path='/npcs/minions/:id' element={<MinionView />} />
    </Routes>
  )
}