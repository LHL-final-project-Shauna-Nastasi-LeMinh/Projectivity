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

  console.log('columns', state.allUserColumns)
  console.log('projects', state.allUserProjects)
  console.log('assignments', state.allUserProjectAssignments)
  console.log('tickets', state.allUserTickets)

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
	// *** NOTES *** //
	// Add to this setState function to change values in state using the template provided
	// {state_name}: setState({ ...state, state.{state_name}: {data_to_store} })
	// replace {state_name} with the state from [state, setState above]
	// replace {data_to_store} with the data you want to store in state.{state_name}

	// If you want to pass in a function use this template
	// Example: {state_name}: event => setState({ ...state, [state.{state_name}]: {data_to_store} })
	// here's one using event to get a value from the event target
	// Example: {state_name}: event => setState({ ...state, [state.{state_name}]: event.target.value })
	// Then you can call it where it needs to run like onClick={state.{state_name}} where {state_name} is the name of the function from state
	// If you want to pass in data you can use prop
	// Example: {state_name}: prop => event => { setState({ ...state, [state.{state_name}: prop }) }
	// Then you only need to call the function where it needs to run
	// Example: onClick={state.{state_name}(prop)}

	// *** NOTES *** //
	// You can still pass down individual parts of state to Components
	// Example: <Component mode={state.mode} />
	// In the Component, it will still work as if it was always a local state, like [mode, setMode] = useState()
	// Alternatively you can just pass down state itself and then deconstruct the parts you need when you need them
	// Example: Header doesn't actually need any of the stateful objects it's being passed
	// instead it just passes them down again to NavbarMenu
	// so Header doesn't need a const { prop, prop, prop } = props
	// And can just pass down state like so: <NavbarMenu state={props.state} />
	// Then NavbarMenu can deconstruct state to extract what it needs like normal:
	// Example: { prop_navbar_needs, prop_navbar_needs, prop_navbar_needs } = props.state
}

export default App
