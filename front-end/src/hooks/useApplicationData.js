import { ClassNames } from '@emotion/react'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function useApplicationData () {
  const [state, setState] = useState({
		// DATA TO GET BEFORE LOG IN
    currentRoles: null,
    usersList: null,

		// DATA TO SET WHEN USER LOGS IN
    currentUser: null,
    currentCookies: null,
    userLoggedIn: false,

		// DATA TO GET AFTER LOG IN
    allUserProjectAssignments: null,
    allUserProjects: null,
    allUserColumns: null,
    allUserTickets: null,
    allUserEmployees: null,
    allUserMilestones: null,
    allUserSeverities: null,
    allUserPriorities: null,
    allUserTypes: null,
    allUserStatuses: null,

		// DATA FOR CURRENT SELECTED PROJECT
    selectedProjectAssignments: null,
    selectedProjects: null,
    selectedColumns: null,
    selectedTickets: null,
    selectedEmployees: null,
    selectedMilestones: null,
    selectedSeverities: null,
    selectedPriorities: null,
    selectedTypes: null,
    selectedStatuses: null,

		// A GENERIC STATE SETTER WITH DATA
		// use this to set all of the above states
    setStateTarget: function (target, data) {
      setState(prev => ({
        ...prev,
        [target]: data
      }))
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
    setMode: function (target) {
      setState(prev => ({
        ...prev,
        modes: { ...prev.modes, [target]: true, [state.currentMode]: false }
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
    openModal: function (target) {
      setState(prev => ({
        ...prev,
        modals: { ...prev.modals, [target]: true }
      }))
    },
    closeModal: function (target) {
      setState(prev => ({
        ...prev,
        modals: { ...prev.modals, [target]: false }
      }))
    },
    getUserData: function getUserData (employee_id) {
      axios
				.get(
					process.env.REACT_APP_BACKEND_URL + '/getUserData/' + employee_id,
        {
          employee_id: employee_id
        }
				)
				.then(res => {
  this.setStateTarget('allUserPriorities', res.data.ticket_priority)
  this.setStateTarget('allUserSeverities', res.data.ticket_severity)
  this.setStateTarget('allUserTypes', res.data.ticket_type)
  this.setStateTarget('allUserColumns', res.data.user_columns)
  this.setStateTarget(
						'allUserProjectAssignments',
						res.data.user_project_assignments
					)
  this.setStateTarget('allUserProjects', res.data.user_projects)
  this.setStateTarget('allUserTickets', res.data.user_tickets)
})
				.catch(err => {
  console.log('GET USER DATA FAILED', err)
})
    }
  })

  function getGenericData () {
    axios
			.get(process.env.REACT_APP_BACKEND_URL + '/getGenericData/')
			.then(res => {
  setState(
					prev => ({
  ...prev,
  currentRoles: res.data.roles
}),
					setState(prev => ({
  ...prev,
  usersList: res.data.users
}))
				)
})
			.catch(err => {
  console.log('get generic data failed', err)
})
  }

  useEffect(() => {
    getGenericData()
  }, [])

  return { state }
}

// *** NOTES *** //
// All state should be added to this [state, setState] object tree and then passed down
// You can give a state object a default value like so {stateObject}: {defaultValue}
// Where {stateObject} is the name of the state object, like current User,
// and {defaultValue} is the default value you want to pass in
// Example: currentUser = true
// Example: currentUser = { user: 'Jane' }
// Example: currentRoles = [ 'Manager', 'Developer', 'Tester' ]
