import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import About from './pages/About'
import Table from './pages/Table'
import Notes from './pages/Notes'
import Lists from './pages/Lists'
import './styles/App.scss'

import useComponentsStore from './store/useComponentsStore';
import usePropsStore from './store/usePropsStore';

function App() {
  const { fetch: fetchComponents } = useComponentsStore();
  const { fetch: fetchProperties } = usePropsStore();
  useEffect(() => {
    fetchComponents();    
    fetchProperties();
  }, [fetchComponents, fetchProperties]);

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
