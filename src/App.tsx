import React from 'react';
import './App.css';
import { Weather } from './view/Weather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to my weather app</h1>
      </header>
      <Weather />
    </div>
  );
}

export default App;
