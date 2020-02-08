import React from 'react';
import './App.css';
import SetSymbol from "./setSymbol/setSymbol"
import GetSymbol from "./getSymbol/getSymbol"
function App() {
  return (
    <div className="App">
      <h1>Set Symbol</h1>
      <SetSymbol />
      <h1>Get Symbol</h1>
      <GetSymbol />
    </div>
  );
}

export default App;
