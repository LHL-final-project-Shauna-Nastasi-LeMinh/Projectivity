import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { LANDING, LOGIN, REGISTER, ABOUT } from './constants/Modes'

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
  const { mode, setMode, user, setUser, cookies, removeCookie } = props
  const [tabIndex, setTabIndex] = useState(0)

  const handleChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  useEffect(() => {
    if (user) {
      setTabIndex(0);
    }
  }, [user]);

  const logOut = () => {
    setUser(null)
    setMode(LANDING)
    removeCookie('user');
		// a axios call to clear cookie session in server side too
    axios
			.get(process.env.REACT_APP_BACKEND_URL + '/accessControl/logout')
			.catch(err => {
        console.log(err)
      })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tabIndex} onChange={handleChange} aria-label='nav tabs example'>
        {!user && <LinkTab label='About' onClick={() => setMode(ABOUT)} />}
        {!cookies["user"] && <LinkTab label='Login' onClick={() => setMode(LOGIN)} />}
        {!cookies["user"] && <LinkTab label='Sign Up' onClick={() => setMode(REGISTER)} />}
        {cookies["user"] && <LinkTab label='Logout' onClick={logOut} />}
      </Tabs>
    </Box>
  )
}
