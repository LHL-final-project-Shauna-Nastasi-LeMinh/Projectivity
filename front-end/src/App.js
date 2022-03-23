import './App.css'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import Header from './components/Header'
import Main from './components/Main'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { LANDING } from './components/constants/Modes'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './Theme'

const App = () => {
  const [mode, setMode] = useState(LANDING)
  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [currentProject, setCurrentProject] = useState()
  const [currentColumn, setCurrentColumn] = useState('')

	// MODAL STATE
  const [open, setOpen] = useState()
  console.log(open)

  return (
    <ThemeProvider theme={theme}>
      <Container className='App'>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '4rem'
          }}
				>
          <Header
            mode={mode}
            setMode={setMode}
            user={user}
            setUser={setUser}
            cookies={cookies}
            removeCookie={removeCookie}
            open={open}
            setOpen={setOpen}
					/>
        </Box>
        <Box
          sx={{
            position: 'fixed',
            top: '4rem',
            left: 0,
            width: '100%',
            height: '100%'
          }}
				>
          <Main
            mode={mode}
            setMode={setMode}
            user={user}
            setUser={setUser}
            setCookie={setCookie}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            currentColumn={currentColumn}
            setCurrentColumn={setCurrentColumn}
            open={open}
            setOpen={setOpen}
					/>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
