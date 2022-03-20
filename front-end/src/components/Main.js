import React from 'react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import LandingPage from './LandingPage'
import Box from '@mui/material/Box'
import { LANDING, LOGIN, REGISTER, ABOUT } from './constants/Modes'
import AboutPage from './AboutPage'

export default function Main (props) {
  const { mode, setMode, user, setUser, userProjects, setUserProjects, setCookie } = props

  return (
    <Box>
      {mode === ABOUT && <AboutPage />}
      {mode === LOGIN && !user && <LoginForm setUser={setUser} setCookie={setCookie}/>}
      {mode === REGISTER && !user && <RegistrationForm setUser={setUser} setCookie={setCookie}/>}
      {user &&
      <LandingPage
        mode={mode}
        setMode={setMode}
        user={user}
        setUser={setUser}
        userProjects={userProjects}
        setUserProjects={setUserProjects}
				/>}
    </Box>
  )
}
