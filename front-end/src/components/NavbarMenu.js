import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {
	LANDING_VIEW,
	LOGIN_FORM,
	REGISTER_FORM,
	ABOUT_VIEW
} from './constants/Modes'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import { HR_LEVEL } from './constants/AccessLevel'

const page_strings = ['About', 'Login', 'Register']
const page_views = [ABOUT_VIEW, LOGIN_FORM, REGISTER_FORM]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']
const setting_views = [LANDING_VIEW, LANDING_VIEW, LANDING_VIEW, LANDING_VIEW]

function LinkTab (props) {
  return (
    <Tab
      component='a'
      onClick={event => {
        event.preventDefault()
      }}
      {...props}
		/>
  )
}

export default function NavbarMenu (props) {
  const {
		mode,
		setMode,
		user,
		setUser,
		cookies,
		removeCookie,
		modals,
		openModals
	} = props
  const [email, setEmail] = useState(null)
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  function handleMenuClick (string, newMode) {
    if (string === 'Logout') {
			// a axios call to clear cookie session in server side too
      axios
				.get(process.env.REACT_APP_BACKEND_URL + '/accessControl/logout')
				.then(res => {
  setUser(null)
  setMode(LANDING_VIEW)
  removeCookie('user')
})
				.catch(err => {
  console.log(err)
})
    }

    if (string === 'Login' || string === 'Register') {
			// handleOpenLogin
    }

    console.log('string is:', string)
    setMode(newMode)
    setAnchorElUser(null)
  }

  useEffect(
		() => {
  if (user) {
    setEmail(user.email)
  }
},
		[user]
	)

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      {!user &&
      <ButtonGroup
        orientiation={{ vertical: 'top', horizontal: 'right' }}
        variant='text'
				>
        <Button
          key='about'
          onClick={() => setMode(ABOUT_VIEW)}
          sx={{ color: 'white', display: 'block' }}
					>
						About
					</Button>
        <Button
          key='login'
          onClick={() => openModals('loginForm')}
          sx={{ color: 'white', display: 'block' }}
					>
						Login
					</Button>
        <Button
          keyw='register'
          sx={{ color: 'white', display: 'block' }}
          onClick={() => openModals('registerForm')}
					>
						Register
					</Button>
      </ButtonGroup>}
      {user &&
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
              {email}
            </Typography>
          </Box>
          {user &&
							user.access_level == HR_LEVEL &&
							<Button
  key='register'
  sx={{ color: 'white', display: 'block' }}
  onClick={openModals('registerForm')}
							>
								Add Employee
							</Button>}
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
