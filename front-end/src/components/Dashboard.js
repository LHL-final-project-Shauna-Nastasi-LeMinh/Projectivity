import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardItem from './DashboardItem'

export default function Dashboard (props) {
  const {
		mode,
		setMode,
		viewMode,
		setViewMode,
		user,
		currentProject,
		setCurrentProject,
		loadForm,
		open,
		setOpen,
		state
	} = props

	//   const [projects, setProjects] = useState()
	//   const [dashboardProjects, setDashboardProjects] = useState()
	//   const stateRef = useRef()
	//   stateRef.current = dashboardProjects

	//   function purgeNullStates (states) {
	//     const results = []

	//     if (stateRef.current) {
	//       for (const state of states) {
	//         if (state !== null) {
	//           results.push(state)
	//         }
	//       }
	//     }

	//     return results
	//   }

	//   let index = 0

  function selectProject (index) {
    const newCurrentProject = state.allUserProjects.filter(project => {
      if (project.id === index) {
        return project
      }
    })

    state.setStateTarget('currentProject', newCurrentProject)

    const newCurrentColumns = state.allUserColumns.filter(column => {
      if (column.project_id === index) {
        return column
      }
    })

    const newCurrentTickets = []

    for (const column of newCurrentColumns) {
      for (const ticket of state.allUserTickets) {
        if (column.id === ticket.column_id) {
          newCurrentTickets.push(ticket)
        }
      }
    }

    console.log(
			'Select Current Project',
			newCurrentProject,
			newCurrentColumns,
			newCurrentTickets
		)

		//     if (stateRef.current[index]) {
		//       axios
		// 				.get(
		// 					process.env.REACT_APP_BACKEND_URL +
		// 						'/projects/' +
		// 						stateRef.current[index].id +
		// 						'/columns'
		// 				)
		// 				.then(res => {
		//   setCurrentProject(prev => {
		//     return { ...stateRef.current[index], Columns: res.data }
		//   })
		//   setViewMode(PROJECT_VIEW)
		// })
		//     }
  }

	//   useEffect(() => {
	//     axios
	// 			.get(process.env.REACT_APP_BACKEND_URL + `/projects/${user.id}`)
	// 			.then(res => {
	//   setDashboardProjects(
	// 					res.data.map(project_assignment => project_assignment.Project)
	// 				)
	//   purgeNullStates(stateRef.current)
	//   setProjects(
	// 					stateRef.current.map(project =>
	//   <DashboardItem
	//     key={project.id}
	//     value={project.name}
	//     listIndex={index++}
	//     currentProject={currentProject}
	//     dashItemProject={project}
	//     setCurrentProject={setCurrentProject}
	//     selectProject={selectProject}
	//     viewMode={viewMode}
	//     setViewMode={setViewMode}
	//     loadForm={loadForm}
	// 						/>
	// 					)
	// 				)
	//   selectProject(0)
	// })
	// 			.catch(err => {
	//   console.log(err)
	// })
	//   }, [])

  let index = 0

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: '4rem',
        width: '100%',
        maxWidth: 360
      }}
		>
      <List component='nav' aria-label='main mailbox folders'>
        {state.allUserProjects.map(project => {
          return (
            <DashboardItem
              key={index++}
              value={project}
              listIndex={index++}
              primary={project.name}
              state={state}
						/>
          )
        })}
        <ListItemButton key={index++} value='Create New Project'>
          <ListItemIcon />
          <ListItemText
            primary='Create New Project'
            onClick={() => state.openModal('newProjectForm')}
					/>
        </ListItemButton>
      </List>
    </Box>
  )
}
