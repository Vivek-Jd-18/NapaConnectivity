import React from 'react';
import './App.css';
import { Home } from './component/Home';
import { Desktop } from './component/Desktop';
import { Home as LazyMint } from './component/LazyMint';
import { Spinner } from './component/Spinner';

function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      <LazyMint/>
      {/* <Spinner/> */}
    </div>
  );
}

export default App;
