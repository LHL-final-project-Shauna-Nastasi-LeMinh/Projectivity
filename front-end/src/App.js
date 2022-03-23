import './App.css'
import React, { useEffect, useState, componentWillMount } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import Header from './components/Header'
import Main from './components/Main'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './Theme'
import {
	LANDING_VIEW,
	LOGIN_FORM,
	REGISTER_FORM,
	ABOUT_VIEW,
	NEW_PROJECT_FORM,
	NEW_TICKET_FORM,
	PROJECT_VIEW,
	DELETE_PROJECT_FORM,
	DASH_VIEW,
	DELETE_TICKET_FORM,
	NEW_COLUMN_FORM
} from './components/constants/Modes'

const App = () => {
	// *** NOTES *** //
	// All state should be added to this [state, setState] object tree and then passed down
	// You can give a state object a default value like so {stateObject}: {defaultValue}
	// Where {stateObject} is the name of the state object, like current User,
	// and {defaultValue} is the default value you want to pass in
	// Example: currentUser = true
	// Example: currentUser = { user: 'Jane' }
	// Example: currentRoles = [ 'Manager', 'Developer', 'Tester' ]
  const [state, setState] = useState({
		// DATA TO GET BEFORE LOG IN
    currentRoles: null,
    setCurrentRoles: prop => {
      setState({ ...state, [state.currentRoles]: prop })
    },
    usersList: null,
    setUsersList: prop => {
      setState({ ...state, [state.usersList]: prop })
    },

		// DATA TO SET WHEN USER LOGS IN
    currentUser: null,
    setCurrentUser: prop => event => {
      setState({ ...state, [state.currentUser]: prop })
      if (prop !== null) {
				// get user data if user is being logged in
				// ignore if user is logging out (being set to null)
				// getUserData function grabs user data
        getUserData()
      }
    },
    currentCookies: null,
    setCurrentCookies: prop => event => {
      setState(prev => ({ ...prev, currentCookies: prop }))
    },

		// DATA TO GET AFTER LOG IN
    currentProjectAssignments: null,
    setCurrentProjectAssignments: prop => event => {
      setState({ ...state, [state.currentProjectAssignments]: prop })
    },

    currentProjects: null,
    setCurrentProjects: prop => event => {
      setState({ ...state, [state.currentProjects]: prop })
    },

    currentColumns: null,
    setCurrentColumns: prop => event => {
      setState({ ...state, [state.currentColumns]: prop })
    },

    currentTickets: null,
    setCurrentTickets: prop => event => {
      setState({ ...state, [state.currentTickets]: prop })
    },

    currentEmployees: null,
    setCurrentEmployees: prop => event => {
      setState({ ...state, [state.currentEmployees]: prop })
    },

    currentMilestones: null,
    setCurrentMilestones: prop => event => {
      setState({ ...state, [state.currentMilestones]: prop })
    },

    currentSeverities: null,
    setCurrentSeverities: prop => event => {
      setState({ ...state, [state.currentSeverities]: prop })
    },

    currentPriorities: null,
    setCurrentPriorities: prop => event => {
      setState({ ...state, [state.currentPriorities]: prop })
    },

    currentTypes: null,
    setCurrentTypes: prop => event => {
      setState({ ...state, [state.currentTypes]: prop })
    },

    currentStatuses: null,
    setCurrentStatuses: prop => event => {
      setState({ ...state, [state.currentStatuses]: prop })
    },

		// FORM DATA
    formData: {},
    setFormData: (data_name, data) => event => {
      if (data === null || data === undefined) {
        setState(prev => ({
          ...prev,
          formData: { ...prev.formData, [data_name]: event.target.value }
        }))
      } else {
        setState(prev => ({
          ...prev,
          formData: { ...prev.formData, [data_name]: data }
        }))
      }
    },

		// MODE VIEWS
    modes: {
      aboutView: false,
      projectView: false,
      dashView: false,
      landingView: false
    },
    currentMode: 'aboutView',
    setMode: new_mode => event => {
      setState(prev => ({
        ...prev,
        modes: { ...prev.modes, [new_mode]: true },
        currentMode: false,
        currentMode: new_mode
      }))
    },

		// MODALS
    modals: {
      loginForm: false,
      registerForm: false,
      newProjectForm: false,
      newColumnForm: false,
      newTicketForm: false,
      editProjectForm: false,
      editColumnForm: false,
      editTicketForm: false,
      deleteProjectForm: false,
      deleteColumnForm: false,
      deleteTicketForm: false
    },
    setModal: (new_modal, bool) => event => {
      setState(prev => ({
        ...prev,
        modals: { ...prev.modals, [new_modal]: bool }
      }))
    }
  })

  async function getGenericData () {
    await axios
			.get(process.env.REACT_APP_BACKEND_URL + '/getGenericData/')
			.then(res => {
  if (res.data !== null) {
    state.setCurrentRoles(res.data.roles)
    state.setUsersList(res.data.users)
  }
})
			.catch(err => {
  console.log('get generic data failed', err)
})
  }

  useEffect(() => {
    axios
			.get(process.env.REACT_APP_BACKEND_URL + '/getGenericData/')
			.then(res => {
  if (res.data !== null) {
    if (res.data.roles && res.data.users) {
      setState({
        ...state,
        currentRoles: res.data.roles,
        usersList: res.data.users
      })
    }
  }
})
			.catch(err => {
  console.log('get generic data failed', err)
})
  }, [])

  function getUserData () {}

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
