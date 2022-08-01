import React from 'react';
import './css/App.css';
import Table from './pages/Table';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<Table/>}/>
      </Route>
    </Routes>
  );
}

export default App;
