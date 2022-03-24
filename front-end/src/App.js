import './App.css'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import Header from './components/Header'
import Main from './components/Main'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './Theme'
import {
	LANDING_VIEW,
	LOGIN_FORM,
	REGISTER_FORM,
	ABOUT_VIEW,
	NEW_PROJECT_FORM,
	NEW_TICKET_FORM,
	PROJECT_VIEW,
	DELETE_PROJECT_FORM,
	DASH_VIEW,
	DELETE_TICKET_FORM,
	NEW_COLUMN_FORM
} from './components/constants/Modes'
import useApplicationData from './hooks/useApplicationData'

const App = () => {
  const { state } = useApplicationData()
  const [mode, setMode] = useState(LANDING_VIEW)
  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [currentProject, setCurrentProject] = useState()
  const [currentTicket, setCurrentTicket] = useState()
  const [currentColumn, setCurrentColumn] = useState('')

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
            state={state}
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
            state={state}
            mode={mode}
            setMode={setMode}
            user={user}
            setUser={setUser}
            setCookie={setCookie}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            currentColumn={currentColumn}
            setCurrentColumn={setCurrentColumn}
					/>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
