import { THEME_ID, ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import { MainPage } from './MainPage'

const theme = createTheme();

function App() {

  return (
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <MainPage />
    </ThemeProvider>
  )
}

export default App
