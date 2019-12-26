import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import { Helmet } from 'react-helmet';

const TITLE = 'ArchMLP';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <FileUpload />
    </div>
  );
}

export default App;
