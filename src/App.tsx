import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import BuildDynamicTable from './components/TalentTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BuildDynamicTable />
      </header>
    </div>
  );
}

export default App;
