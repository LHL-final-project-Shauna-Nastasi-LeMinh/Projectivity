import React from 'react'
import LoginForm from './Forms/LoginForm'
import RegistrationForm from './Forms/RegistrationForm'
import LandingPage from './LandingPage'
import { LANDING, LOGIN, REGISTER, ABOUT } from './constants/Modes'
import AboutPage from './AboutPage'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'

export default function Main (props) {
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
		setOpen
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
				/>}
    </Paper>
  )
}
