import React, { useState } from 'react'
import NavbarMenu from './NavbarMenu'
import Box from '@mui/material/Box'

export default function Header (props) {
  const { loggedIn, setLoggedIn, mode, setMode } = props

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
