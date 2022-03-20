import React from 'react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import LandingPage from './LandingPage'
import Box from '@mui/material/Box'
import {LOGIN, REGISTER} from './constants/Modes'

export default function Main (props) {
  const { mode, setMode, user, setUser } = props

  return (
    <Box>
      {mode === LOGIN &&
				!user &&
				<LoginForm setUser={setUser}/>}
      {mode === REGISTER &&
				!user &&
				<RegistrationForm setUser={setUser}/>}
      {user && <LandingPage />}
    </Box>
  )
}
