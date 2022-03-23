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

  return (
    <Paper>
      {state.modes.aboutView && <AboutPage />}
      {state.modals.loginForm &&
				state.currentUser === null &&
				<LoginForm state={state} />}
      {state.modals.registerForm &&
				!state.currentUser &&
				<RegistrationForm state={state} />}
      {state.modals.newProjectForm && <NewProjectForm state={state} />}
      {state.modals.newTicketForm && <NewTicketForm state={state} />}
      {state.currentUser && <LandingPage state={state} />}
    </Paper>
  )
}
