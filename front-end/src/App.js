import './App.css'
import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { LANDING } from './components/constants/Modes'

const App = () => {
  const [mode, setMode] = useState(LANDING)
  const [user, setUser] = useState()
  const [userProjects, setUserProjects] = useState()
  const [currentProject, setCurrentProject] = useState()
	// const [currentColumns, setCurrentColumns] = useState()
	// const [currentTickets, setCurrentTickets] = useState()

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
        <Header mode={mode} setMode={setMode} user={user} setUser={setUser} />
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
          mode={mode}
          setMode={setMode}
          user={user}
          setUser={setUser}
          userProjects={userProjects}
          setUserProjects={setUserProjects}
				/>
      </Box>
    </Container>
  )
}

export default App
