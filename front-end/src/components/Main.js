import React from 'react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import LandingPage from './LandingPage'
import Box from '@mui/material/Box'
import {LOGIN, REGISTER} from './constants/Modes'

export default function Main (props) {
  const { loggedIn, setLoggedIn, mode, setMode, setUser } = props

  return (
    <Box>
      {mode === LOGIN &&
				loggedIn === false &&
				<LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser}/>}
      {mode === REGISTER &&
				loggedIn === false &&
				<RegistrationForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser}/>}
      {loggedIn === true && <LandingPage />}
    </Box>
  )
}
