import React from 'react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import LandingPage from './LandingPage'
import Box from '@mui/material/Box'
import { LANDING, LOGIN, REGISTER, ABOUT } from './constants/Modes'
import AboutPage from './AboutPage'

export default function Main (props) {
<<<<<<< HEAD
  const { mode, setMode, user, setUser, cookies, setCookie} = props

  return (
    <Box>
      {mode === LOGIN &&
				!user &&
				<LoginForm setUser={setUser} setCookie={setCookie}/>}
      {mode === REGISTER &&
				!user &&
				<RegistrationForm setUser={setUser} setCookie={setCookie}/>}
      {user && <LandingPage />}
=======
  const { mode, setMode, user, setUser, userProjects, setUserProjects } = props

  return (
    <Box>
      {mode === ABOUT && <AboutPage />}
      {mode === LOGIN && !user && <LoginForm setUser={setUser} />}
      {mode === REGISTER && !user && <RegistrationForm setUser={setUser} />}
      {user &&
      <LandingPage
        mode={mode}
        setMode={setMode}
        user={user}
        setUser={setUser}
        userProjects={userProjects}
        setUserProjects={setUserProjects}
				/>}
>>>>>>> master
    </Box>
  )
}
