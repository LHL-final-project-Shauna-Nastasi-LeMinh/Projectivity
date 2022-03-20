import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

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
  const { loggedIn, setLoggedIn, mode, setMode } = props
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label='nav tabs example'>
        {!loggedIn &&
        <LinkTab label='Login' onClick={() => setMode('Login')} />}
        {!loggedIn &&
        <LinkTab label='Sign Up' onClick={() => setMode('Register')} />}
        {loggedIn &&
        <LinkTab
          label='Logout'
          onClick={() => {
            setMode('')
            setLoggedIn(false)
          }}
					/>}
      </Tabs>
    </Box>
  )
}
