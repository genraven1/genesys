import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AllTalentsViewTable from './components/AllTalentsViewTable';
import BuildDynamicTable from './components/TalentTable';

function App() {
  const [greeting, setGreeting] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/greeting')
      .then(function (response) {
       setGreeting(response.data)
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [greeting]);

  return (
    <div className="App">
      <header className="App-header">
        <pre>{greeting}</pre>
        <BuildDynamicTable />
        <AllTalentsViewTable />
      </header>
    </div>
  );
}

export default App;
