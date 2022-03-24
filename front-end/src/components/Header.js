import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import NavbarMenu from './NavbarMenu'

export default function Header (props) {
  const {
		mode,
		setMode,
		user,
		setUser,
		cookies,
		removeCookie,
		modals,
		openModals,
		state
	} = props

  return (
    <AppBar position='static'>
      <Container maxWidth='100%'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { xs: 'none', md: 'flex' } }}
					>
						PRODUCTIVITY MANAGER APP
					</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <NavbarMenu
            state={state}
            mode={mode}
            setMode={setMode}
            user={user}
            setUser={setUser}
            cookies={cookies}
            removeCookie={removeCookie}
            modals={modals}
            openModals={openModals}
					/>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
