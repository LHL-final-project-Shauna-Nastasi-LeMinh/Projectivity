import React, { useState } from 'react'
import NavbarMenu from './NavbarMenu'
import Box from '@mui/material/Box'
import axios from 'axios'

export default function Header (props) {
  const {
		loggedIn,
		setLoggedIn,
		mode,
		setMode,
		loggedEmail,
		setLoggedEmail
	} = props

  const logOut = () => {
    setLoggedIn(false)
    setLoggedEmail(null)
    alert('Logged out')
		// a axios call to clear cookie session in server side too
    axios
			.get(process.env.REACT_APP_BACKEND_URL + '/accessControl/logout')
			.catch(err => {
  console.log(err)
})
  }

  return (
    <header>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mx: '1rem'
        }}
			>
        <div>
          <h2>Productivity Manager App</h2>
        </div>
        <div>
          <NavbarMenu
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            mode={mode}
            setMode={setMode}
					/>
        </div>
      </Box>
    </header>
  )
}
