import { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import Talent from '../models/Talent';
import AllTalentsView from './AllTalentsViewTable';
import CreateTalent from './CreateTalent';
import MinionTable from './MinionTable';
import MinionView from './MinionView';

export default function MainPage() {
    const selectedTalent = useRef<Talent | null>(null);

    return (
        <Routes>
        <Route path='/talents' element={<AllTalentsView />} />
        <Route path='/talents/new' element={<CreateTalent talent={selectedTalent.current} />} />
        <Route path='/actors/npcs/minions' element={<MinionTable />} />
        <Route path='/actors/npcs/minions/:id' element={<MinionView />} />
      </Routes>
    )
}