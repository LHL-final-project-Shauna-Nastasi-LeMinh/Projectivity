import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import { styled, useTheme, makeStyles, withStyles } from '@mui/material/styles'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardItem from './DashboardItem'
import DeleteProjectForm from './Forms/DeleteProjectForm'
import NewProjectForm from './Forms/NewProjectForm'
import EditProjectForm from './Forms/EditProjectForm'
import { MANAGER_LEVEL } from './constants/AccessLevel'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './Theme'

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
		modals,
		openModals,
		closeModals,
		allEmployees
	} = props

  const [openDrawer, setOpenDrawer] = useState(false)
  const [projects, setProjects] = useState()
  const [dashboardProjects, setDashboardProjects] = useState()
  const [selectedIndex, setSelectedIndex] = useState()
  const drawerWidth = 'fit-content'

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  const openedMixin = theme => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
  })

  const closedMixin = theme => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`
    }
  })

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
    ...theme.mixins.toolbar
  }))

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'openDrawer'
  })(({ theme, openDrawer }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(openDrawer && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }))

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'openDrawer'
  })(({ theme, openDrawer }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(openDrawer && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!openDrawer && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  }))

  let index = 0

  function selectProject (index) {
    if (dashboardProjects[index]) {
      axios
				.get(
					process.env.REACT_APP_BACKEND_URL +
						'/projects/' +
						dashboardProjects[index].id +
						'/columns'
				)
				.then(res => {
  console.log('#### THEN', dashboardProjects[index])
  setCurrentProject(prev => {
    return { ...dashboardProjects[index], Columns: res.data }
  })
  setDashboardProjects([...dashboardProjects])
})
    }
  }

  useEffect(() => {
    axios
			.get(process.env.REACT_APP_BACKEND_URL + `/projects/${user.id}`)
			.then(res => {
  const data = res.data.map(
					project_assignment => project_assignment.Project
				)
  setDashboardProjects(data)
				// selectProject(0)
})
			.catch(err => {
  console.log(err)
})
  }, [])

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

  console.log('#### BEFORE', dashboardProjects)

  return (
    <ThemeProvider theme={theme}>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
			>
        {modals.deleteProjectForm &&
        <DeleteProjectForm
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
          setViewMode={setViewMode}
          modals={modals}
          closeModals={closeModals}
          dashboardProjects={dashboardProjects}
          setDashboardProjects={setDashboardProjects}
					/>}
        {modals.newProjectForm &&
        <NewProjectForm
          user={user}
          setViewMode={setViewMode}
          modals={modals}
          closeModals={closeModals}
          setProjects={setProjects}
          dashboardProjects={dashboardProjects}
          setDashboardProjects={setDashboardProjects}
					/>}
        {modals.editProjectForm &&
        <EditProjectForm
          user={user}
          setViewMode={setViewMode}
          modals={modals}
          closeModals={closeModals}
          setProjects={setProjects}
          dashboardProjects={dashboardProjects}
          setDashboardProjects={setDashboardProjects}
					/>}
        <Offset />
        <Box sx={{ overflow: 'auto' }}>
          <List component='nav' aria-label='main mailbox folders'>
            {dashboardProjects &&
							dashboardProjects.map(project =>
  <DashboardItem
    key={project.id}
    value={project.name}
    listIndex={index++}
    currentProject={currentProject}
    dashItemProject={project}
    setCurrentProject={setCurrentProject}
    selectProject={selectProject}
    viewMode={viewMode}
    setViewMode={setViewMode}
    loadForm={loadForm}
    user={user}
    selectedIndex={selectedIndex}
    setSelectedIndex={setSelectedIndex}
								/>
							)}
            {user.access_level == MANAGER_LEVEL &&
            <ListItemButton value='Create New Project'>
              <ListItemIcon />
              <ListItemText
                primary='Create New Project'
                onClick={() => openModals('newProjectForm')}
								/>
            </ListItemButton>}
          </List>
        </Box>
      </Drawer>
    </ThemeProvider>
  )
}
