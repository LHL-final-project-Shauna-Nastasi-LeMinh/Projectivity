import './App.css'
import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true)
  const [mode, setMode] = useState('')
  const [user, setUser] = useState()

  return (
    <Container className='App'>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '4rem'
        }}
			>
        <Header
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          mode={mode}
          setMode={setMode}
          user={user}
          setUser={setUser}
				/>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          top: '4rem',
          left: 0,
          width: '100%',
          height: '100%'
        }}
			>
        <Main
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          mode={mode}
          setMode={setMode}
          setUser={setUser}
				/>
      </Box>
    </Container>
  )
}

export default App
