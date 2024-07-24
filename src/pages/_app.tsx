import HomePage from '../components/HomePage';
import GenericContextProvider from '../context/GenericContext';
import React from 'react';
import '../styles/globals.css'

global.punycode = require('punycode/');

const App: React.FC = () => (
  <GenericContextProvider>
    <div>
      <HomePage/>
    </div>

  </GenericContextProvider>
);

export default App;