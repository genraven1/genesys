import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/navigation/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllTalentsView from './components/AllTalentsViewTable';
import CreateTalent from './components/CreateTalent';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/talents' element={<AllTalentsView />}></Route>
        <Route path='/talents/new' element={<CreateTalent />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
