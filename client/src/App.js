import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
  const [dataName, setDataName] = useState('');
  const [file, setFile] = useState({});

  return (
    <div className="App">
      <HelmetProvider>
        <Helmet title="ArchMLP" />
      </HelmetProvider>
      <FileUpload
        dataName={dataName}
        setDataName={setDataName}
        file={file}
        setFile={setFile}
      />
    </div>
  );
}

export default App;
