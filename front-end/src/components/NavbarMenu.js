import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import axios from 'axios'
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
  const { mode, setMode, user, setUser } = props
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const logOut = () => {
    setUser(null)
    setMode(LANDING)
		// a axios call to clear cookie session in server side too
    axios
			.get(process.env.REACT_APP_BACKEND_URL + '/accessControl/logout')
			.catch(err => {
  console.log(err)
})
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label='nav tabs example'>
        {!user && <LinkTab label='About' onClick={() => setMode(ABOUT)} />}
        {!user && <LinkTab label='Login' onClick={() => setMode(LOGIN)} />}
        {!user && <LinkTab label='Sign Up' onClick={() => setMode(REGISTER)} />}
        {user && <LinkTab label='Logout' onClick={logOut} />}
      </Tabs>
    </Box>
  )
}
