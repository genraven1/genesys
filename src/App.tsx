import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AllTalentsViewTable from './components/AllTalentsViewTable';
import ControlledAccordions from './components/AllTalentsViewAccordian';

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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <pre>{greeting}</pre>
      </header>
      {<ControlledAccordions />}
      {/* <AllTalentsViewTable /> */}
    </div>
  );
}

export default App;
