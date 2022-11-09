import './App.css';
import Main from './pages/Main';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState(false);

  return (
    <ThemeProvider theme={value ? darkTheme : lightTheme}>
      <Main value={value} setValue={setValue} />
    </ThemeProvider>
  );
}

export default App;
