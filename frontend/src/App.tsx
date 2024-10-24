import { THEME_ID, ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import { MainPage } from './pages/MainPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#263238',
    },
    secondary: {
      main: '#455a64',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
