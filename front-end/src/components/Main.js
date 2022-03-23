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
		closeModals
	} = props

  return (
    <Paper>
      {mode === ABOUT_VIEW && <AboutPage />}
      {modals.loginForm &&
				!user &&
				<LoginForm
  setUser={setUser}
  setCookie={setCookie}
  modals={modals}
  closeModals={closeModals}
				/>}
      {modals.registerForm === REGISTER_FORM &&
				!user &&
				<RegistrationForm
  setUser={setUser}
  setCookie={setCookie}
  modals={modals}
  closeModals={closeModals}
				/>}
      {modals.newProjectForm &&
      <NewProjectForm
        user={user}
        setViewMode={setViewMode}
        modals={modals}
        closeModals={closeModals}
				/>}
      {modals.newTicketForm && <NewTicketForm closeModals={closeModals} />}
      {user &&
      <LandingPage
        mode={mode}
        setMode={setMode}
        user={user}
        setUser={setUser}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        currentColumn={currentColumn}
        setCurrentColumn={setCurrentColumn}
        viewMode={viewMode}
        setViewMode={setViewMode}
				/>}
    </Paper>
  )
}
