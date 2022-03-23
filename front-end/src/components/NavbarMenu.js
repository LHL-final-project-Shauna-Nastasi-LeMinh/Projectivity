import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
	Box,
	Tab,
	Menu,
	IconButton,
	Avatar,
	Button,
	Tooltip,
	MenuItem,
	ButtonGroup,
	Typography
} from '@mui/material'

const page_strings = ['About', 'Login', 'Sign Up']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']
const setting_views = ['aboutView', 'aboutView', 'aboutView', 'aboutView']

export default function NavbarMenu (props) {
  const { state, setState } = props

	// const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  function handleMenuClick (string, newMode) {
    if (string === 'Logout') {
      state.setCurrentUser(null)
      state.setMode('landingView')
      state.setCurrentCookies(null)
    }

    if (string === 'Login') {
      state.setModal('state.modals.loginForm', true)
    }

    if (string === 'Register') {
      state.setModal('state.modals.registerForm', true)
    }

    setState({
      ...state,
      mode: setState({ ...state, [state.mode]: newMode })
    })

    setAnchorElUser(null)
  }

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      {!state.currentUser &&
      <ButtonGroup
        orientiation={{ vertical: 'top', horizontal: 'right' }}
        variant='text'
				>
        <Button
          key='about'
          onClick={state.setMode('aboutView')}
          sx={{ color: 'white', display: 'block' }}
					>
						About
					</Button>
        <Button
          key='login'
          onClick={state.setModal('loginForm', true)}
          sx={{ color: 'white', display: 'block' }}
					>
						Login
					</Button>
        <Button
          key='register'
          sx={{ color: 'white', display: 'block' }}
          onClick={state.setModal('registerForm', true)}
					>
						Register
					</Button>
      </ButtonGroup>}
      {state.currentUser &&
      <Box>
        <Box
          sx={{
            display: 'flex'
          }}
					>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              mx: 1
            }}
						>
            <Typography variant='h6'>
              {state.currentUser.email}
            </Typography>
          </Box>
          <Tooltip title='Open settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          sx={{ mt: '45px' }}
          id='menu-appbar'
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorElUser)}
          onClose={() => setAnchorElUser(null)}
					>
          {settings.map((setting, index) =>
            <MenuItem
              key={setting}
              onClick={() => handleMenuClick(setting, setting_views[index])}
							>
              <Typography textAlign='center'>
                {setting}
              </Typography>
            </MenuItem>
						)}
        </Menu>
      </Box>}
    </Box>
  )
}
