import React from 'react';
import './App.css';
import { Home } from './component/Home';
import { Desktop } from './component/Desktop';
import { MarketPlace } from './component/MarketPlace';
import { Home as LazyMint } from './component/LazyMint';
import { Spinner } from './component/Spinner';

function App() {
  
  return (
    <div className="App">
      {/* <Home/> */}
      <LazyMint/>
      <MarketPlace/>
      {/* <Spinner/> */}
    </div>
  );
}

export default App;
