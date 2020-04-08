import React from 'react';
import logo from './logo.svg';
import './App.css';

function getName() {
  return "Andrei";
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {getName()} pidr
        </h1>
      </header>
    </div>
  );
}

export default App;
