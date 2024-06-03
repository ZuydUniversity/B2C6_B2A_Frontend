
import React from 'react';
import './App.css';
import ReactLogo from './assets/react.svg'
import DataDisplay from './DataDisplay';
import DataSender from './DataSender';
import DataGridFiller from './DataGridFiller';

const App = () => {
  const navigateToAfsprakenoverzicht = () => {
    // Navigeer naar de afsprakenoverzichtpagina
    window.location.href = '/afsprakenoverzicht';
  };

  return (
    <div className="app">
      <button onClick={navigateToAfsprakenoverzicht}>Naar Afsprakenoverzicht</button>
    </div>
  );
}

export default App;