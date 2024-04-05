import React, { useEffect } from 'react';
import './styles/App.scss'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import About from './pages/About'
import Table from './pages/Table'
import Notes from './pages/Notes'
import Lists from './pages/Lists'
import ComponentsStore from './store/componentsStore'
import PropsStore from './store/propsStore'

function App() {
  useEffect(() => {
    ComponentsStore.fetch();
    PropsStore.fetch();
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Lists />} />
          <Route path='/table' element={<Table />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/about' element={<About />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
