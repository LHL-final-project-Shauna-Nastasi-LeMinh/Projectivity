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
    currentProjectAssignments: null,
    currentProject: null,
    currentColumns: null,
    currentColumn: null,
    currentTickets: null,
    currentTicket: null,
    currentEmployees: null,
    currentMilestones: null,
    currentSeverities: null,
    currentPriorities: null,
    currentTypes: null,
    currentStatuses: null,

		// A GENERIC STATE SETTER WITH DATA
		// use this to set all of the above states
    setStateTarget: function (target, data) {
      setState(prev => ({
        ...prev,
        [target]: data
      }))
    },
    setCurrentProject: function (target_project_id) {
      const target_project = state.allUserProjects.map(project => {
        if (project.id === target_project_id) {
          return project
        }
        return null
      })
      const columns = state.allUserColumns.map(column => {
        if (column.project_id === target_project_id) {
          return column
        }
        return null
      })

      const tickets = []
      for (const column of columns) {
        for (const ticket of state.allUserTickets) {
          if (ticket.column_id === column.id && !tickets.includes(ticket)) {
            tickets.push(ticket)
          }
        }
      }

      console.log('nPct', target_project, columns, tickets)

      setState(prev => ({
        ...prev,
        currentProject: target_project,
        currentColumns: columns,
        currentTickets: tickets
      }))
      state.setMode('projectView')
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
      aboutView: true,
      projectView: false,
      dashView: false,
      landingView: false
    },
    currentMode: 'aboutView',
    setMode: function (target) {
      console.log('set view mode', target)
      setState(prev => ({
        ...prev,
        modes: { ...prev.modes, [target]: true, [state.currentMode]: false }
      }))
      setState(prev => ({ ...prev, currentMode: target }))
    },

		// MODALS
    modals: {
      loginForm: false,
      registerForm: false,
      showTicketDetail: false,
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
      console.log('open modal', target)
      setState(prev => ({
        ...prev,
        modals: { ...prev.modals, [target]: true }
      }))
    },
    closeModal: function (target) {
      console.log('close modal', target)
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
  const first_project = res.data.user_projects[0]
  const project_columns = res.data.user_columns.filter(column => {
    if (column.project_id === first_project.id) {
      return column
    }
  })
  const project_tickets = []
  for (const column of project_columns) {
    for (const ticket of res.data.user_tickets) {
      if (ticket.column_id === column.id) {
        if (!project_tickets.includes(ticket)) {
          project_tickets.push(ticket)
        }
      }
    }
  }

  setState(prev => ({
    ...prev,
    allUserSeverities: res.data.ticket_severity,
    allUserTypes: res.data.ticket_type,
    allUserColumns: res.data.user_columns,
    allUserProjectAssignments: res.data.user_project_assignments,
    allUserProjects: res.data.user_projects,
    allUserTickets: res.data.user_tickets,
    currentProject: first_project,
    currentColumns: project_columns,
    currentTickets: project_tickets
  }))
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
    console.log(
			'generic data loaded',
			state.currentRoles !== null && state.usersList !== null
		)
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
