import React from 'react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import LandingPage from './LandingPage'
import Box from '@mui/material/Box'
import {LANDING, LOGIN, REGISTER} from './constants/Modes'

export default function Main (props) {
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
    </Box>
  )
}
