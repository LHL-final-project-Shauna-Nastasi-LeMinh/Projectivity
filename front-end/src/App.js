import './App.css'
<<<<<<< HEAD
import { useState } from 'react'
=======
import React, { useState } from 'react'
>>>>>>> feature/dashboard-delete
import { useCookies } from 'react-cookie'
import Header from './components/Header'
import Main from './components/Main'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { LANDING } from './components/constants/Modes'
<<<<<<< HEAD
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3D405B'
    },
    secondary: {
      main: '#E07A5F'
    },
    error: {
      main: '#AE2012'
    },
    warning: {
      main: '#EE9B00'
    },
    success: {
      main: '#17c3b2'
    },
    info: {
      main: '#81B29A'
    },
    background: {
      default: '#FEF9EF'
    },
    divider: '#E07A5F'
  }
})
=======
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './Theme'
>>>>>>> feature/dashboard-delete

const App = () => {
  const [mode, setMode] = useState(LANDING)
  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [currentProject, setCurrentProject] = useState()
  const [currentColumn, setCurrentColumn] = useState('')
	// const [currentTickets, setCurrentTickets] = useState()

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
<<<<<<< HEAD
=======
            open={open}
            setOpen={setOpen}
>>>>>>> feature/dashboard-delete
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
<<<<<<< HEAD
=======
            open={open}
            setOpen={setOpen}
>>>>>>> feature/dashboard-delete
					/>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
