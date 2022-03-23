import React, { useState } from 'react'
import LoginForm from './Forms/LoginForm'
import RegistrationForm from './Forms/RegistrationForm'
import LandingPage from './LandingPage'
import {
	LANDING,
	LOGIN,
	REGISTER,
	ABOUT,
	ADD_TICKET,
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
		open,
		setOpen,
    currentTicket,
    setCurrentTicket
	} = props

  console.log('inside main', open)
  console.log('inside main', user)

  return (
    <Paper>
      {mode === ABOUT && <AboutPage />}
      {open === LOGIN &&
				!user &&
				<LoginForm
  setUser={setUser}
  setCookie={setCookie}
  open={open}
  setOpen={setOpen}
				/>}
      {open === REGISTER &&
				!user &&
				<RegistrationForm
  setUser={setUser}
  setCookie={setCookie}
  open={open}
  setOpen={setOpen}
				/>}
      {open === NEW_PROJECT_FORM &&
      <NewProjectForm
        user={user}
        setViewMode={setViewMode}
        open={open}
        setOpen={setOpen}
				/>}
      
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
        currentTicket={currentTicket}
        setCurrentTicket={setCurrentTicket}
        open={open}
        setOpen={setOpen}
        viewMode={viewMode}
        setViewMode={setViewMode}
				/>}
        
    </Paper>
  )
}
