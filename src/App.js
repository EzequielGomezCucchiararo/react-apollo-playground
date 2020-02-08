import React from 'react';

import './App.scss';

import AppLayout from './layout/AppLayout';
import SearchPage from './pages/SearchPage';


function App() {
  return (
    <AppLayout>
      <SearchPage />
    </AppLayout>
  );
}

export default App;
