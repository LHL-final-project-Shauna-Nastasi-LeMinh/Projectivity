import './App.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import Header from './components/Header'
import Main from './components/Main'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './Theme'
import useApplicationData from './hooks/useApplicationData'

const App = () => {
  const { state, getUserData } = useApplicationData()

  return (
    <ThemeProvider theme={theme}>
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
          <Header state={state} />
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
          <Main state={state} />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
