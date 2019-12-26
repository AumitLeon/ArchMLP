import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <Helmet title="ArchMLP" />
      </HelmetProvider>
      <FileUpload />
    </div>
  );
}

export default App;
