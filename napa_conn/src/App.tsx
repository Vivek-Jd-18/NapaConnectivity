import React from 'react';
import './App.css';
import { Home } from './component/Home';
import { Desktop } from './component/Desktop';
import { Home as LazyMint } from './component/LazyMint';

function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      <LazyMint/>
    </div>
  );
}

export default App;
