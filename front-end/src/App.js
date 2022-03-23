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

const App = () => {
  const [mode, setMode] = useState(LANDING_VIEW)
  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [currentProject, setCurrentProject] = useState()
  const [currentColumn, setCurrentColumn] = useState('')

	// MODAL STATE
  const [modals, setModals] = useState({
    loginForm: false,
    registerForm: false,
    newProjectForm: false,
    newTicketForm: false,
    newColumnForm: false,
    deleteProjectForm: false,
    deleteTicketForm: false
  })

  const openModals = prop => event => {
    setModals({ ...modals, [prop]: true })
  }

  const closeModals = prop => event => {
    setModals({ ...modals, [prop]: false })
  }

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
            modals={modals}
            openModals={openModals}
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
            modals={modals}
            openModals={openModals}
            closeModals={closeModals}
					/>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
