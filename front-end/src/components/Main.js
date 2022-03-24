import React from 'react'
import LoginForm from './Forms/LoginForm'
import RegistrationForm from './Forms/RegistrationForm'
import NewProjectForm from './Forms/NewProjectForm'
import NewTicketForm from './Forms/NewTicketForm'
import LandingPage from './LandingPage'
import AboutPage from './AboutPage'
import Paper from '@mui/material/Paper'

export default function Main (props) {
  const { state } = props

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
