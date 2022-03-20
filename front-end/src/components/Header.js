import React, { useState } from 'react'
import NavbarMenu from './NavbarMenu'
import Box from '@mui/material/Box'

export default function Header (props) {
  const {
		mode,
		setMode,
		user,
		setUser,
    cookies,
    removeCookie
	} = props

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
            mode={mode}
            setMode={setMode}
            user={user}
            setUser={setUser}
            cookies={cookies}
            removeCookie={removeCookie}
					/>
        </div>
      </Box>
    </header>
  )
}
