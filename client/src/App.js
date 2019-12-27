import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { blue } from '@material-ui/core/colors';

function App() {
  const [dataName, setDataName] = useState('');
  const [file, setFile] = useState({});

  // Set theme based on user preferences (from OS)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: blue,
          accent: blue[200],
          type: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  );

  return (
    <div className="App">
      <HelmetProvider>
        <Helmet title="ArchMLP" />
      </HelmetProvider>
      <ThemeProvider theme={theme}>
        <FileUpload
          dataName={dataName}
          setDataName={setDataName}
          file={file}
          setFile={setFile}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
