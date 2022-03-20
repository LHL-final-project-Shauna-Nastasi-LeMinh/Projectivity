import React from 'react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import LandingPage from './LandingPage'
import Box from '@mui/material/Box'

export default function Main (props) {
  const { loggedIn, setLoggedIn, mode, setMode } = props

  return (
    <Box>
      {mode === 'Login' &&
				loggedIn === false &&
				<LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      {mode === 'Register' &&
				loggedIn === false &&
				<RegistrationForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      {loggedIn === true && <LandingPage />}
    </Box>
  )
}
