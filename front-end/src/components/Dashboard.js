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
import { theme } from './Theme'
import { ThemeProvider } from '@mui/material/styles'

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
		closeModals
	} = props

  const [openDrawer, setOpenDrawer] = useState(false)
  const [projects, setProjects] = useState()
  const [dashboardProjects, setDashboardProjects] = useState()
  const [selectedIndex, setSelectedIndex] = useState()

  const stateRef = useRef()
  stateRef.current = dashboardProjects

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  const drawerWidth = 240

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
    if (stateRef.current[index]) {
      axios
				.get(
					process.env.REACT_APP_BACKEND_URL +
						'/projects/' +
						stateRef.current[index].id +
						'/columns'
				)
				.then(res => {
  setCurrentProject(prev => {
    return { ...stateRef.current[index], Columns: res.data }
  })
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
  selectProject(0)

  setProjects(
					stateRef.current.map(project =>
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
						/>
					)
				)
})
			.catch(err => {
  console.log(err)
})
  }, [])

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: 'fit-content',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 'fit-content',
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
        <ThemeProvider theme={theme}>
          <List theme={theme} component='nav' aria-label='main mailbox folders'>
            {projects}
            {user.access_level == MANAGER_LEVEL &&
            <ListItemButton value='Create New Project'>
              <ListItemIcon />
              <ListItemText
                primary='Create New Project'
                onClick={() => openModals('newProjectForm')}
								/>
            </ListItemButton>}
          </List>
        </ThemeProvider>
      </Box>
    </Drawer>
  )
}
