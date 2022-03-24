import React, { useState } from 'react'
import LoginForm from './Forms/LoginForm'
import RegistrationForm from './Forms/RegistrationForm'
import LandingPage from './LandingPage'
import {
	LANDING_VIEW,
	LOGIN_FORM,
	REGISTER_FORM,
	ABOUT_VIEW,
	NEW_TICKET_FORM,
	NEW_PROJECT_FORM,
	PROJECT_VIEW
} from './constants/Modes'
import AboutPage from './AboutPage'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'
import NewProjectForm from './Forms/NewProjectForm'
import NewTicketForm from './Forms/NewTicketForm'

export default function Main (props) {
  const [viewMode, setViewMode] = useState(PROJECT_VIEW)

  const {
		mode,
		setMode,
		user,
		setUser,
		setCookie,
		currentProject,
		setCurrentProject,
		currentColumn,
		setCurrentColumn,
		modals,
		openModals,
		closeModals,
		state
	} = props

  const dataLoaded =
		state.currentProject !== null &&
		state.currentColumns !== null &&
		state.currentTickets !== null &&
		state.allUserProjects !== null &&
		state.allUserColumns !== null &&
		state.allUserProjects !== null

  console.log(dataLoaded)

  return (
    <Paper>
      {state.modes.aboutView && <AboutPage />}
      {state.modals.loginForm &&
				!state.userLoggedIn &&
				<LoginForm state={state} />}
      {state.modals.registerForm &&
				!state.userLoggedIn &&
				<RegistrationForm state={state} />}
      {state.modals.newProjectForm &&
				state.userLoggedIn &&
				<NewProjectForm state={state} />}
      {state.modals.newTicketForm &&
				state.userLoggedIn &&
				<NewTicketForm state={state} />}
      {state.userLoggedIn && dataLoaded && <LandingPage state={state} />}
    </Paper>
  )
}
