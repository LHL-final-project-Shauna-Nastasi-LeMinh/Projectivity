import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { styled, useTheme, makeStyles, withStyles } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardItem from './DashboardItem';
import DeleteProjectForm from './Forms/DeleteProjectForm';
import NewProjectForm from './Forms/NewProjectForm';
import EditProjectForm from './Forms/EditProjectForm';
import { MANAGER_LEVEL } from './constants/AccessLevel';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import { dashboardTheme } from './Theme';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Button, Divider, Grid } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Rotate90DegreesCcw } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { theme } from './Theme';
import { Drawer } from '@mui/material';

export default function Dashboard(props) {
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
		allEmployees,
		dashboardProjects,
		setDashboardProjects,
		userData,
		setUserData,
		openDrawer,
		setOpenDrawer,
		drawerWidth
	} = props;

	const [projects, setProjects] = useState();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [modalProject, setModalProject] = useState();
	// const [open, setOpen] = React.useState(false);
	let index = 0;

	const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

	useEffect(() => {
		selectProject(0);
	}, []);

	const toggleDrawer = () => {
		setOpenDrawer(!openDrawer);
	};

	function selectProject(index) {
		setCurrentProject(userData[index]);
	}

	function selectModal(modal_name, project) {
		console.log('selectModal', modal_name, project);
		setModalProject(project);
		openModals(modal_name);
	}

	const openedMixin = (theme) => ({
		width: `${drawerWidth}rem`,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		overflowX: 'hidden'
	});

	const closedMixin = (theme) => ({
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: 0,
		[theme.breakpoints.up('sm')]: {
			width: '16px'
		}
	});

	return (
		<ThemeProvider theme={dashboardTheme}>
			<Drawer
				variant="permanent"
				open={openDrawer}
				sx={{
					width: `${drawerWidth}rem`,
					[`& .MuiDrawer-paper`]: {
						width: `${drawerWidth}rem`,
						boxSizing: 'border-box'
					},
					width: `${drawerWidth}rem`,
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
				}}
			>
				{userData && modals.deleteProjectForm && (
					<DeleteProjectForm
						currentProject={currentProject}
						setCurrentProject={setCurrentProject}
						setViewMode={setViewMode}
						modals={modals}
						closeModals={closeModals}
						dashboardProjects={dashboardProjects}
						setDashboardProjects={setDashboardProjects}
						userData={userData}
						setSelectedIndex={setSelectedIndex}
						modalProject={modalProject}
					/>
				)}
				{userData && modals.newProjectForm && (
					<NewProjectForm
						user={user}
						setViewMode={setViewMode}
						modals={modals}
						closeModals={closeModals}
						setProjects={setProjects}
						dashboardProjects={dashboardProjects}
						setDashboardProjects={setDashboardProjects}
						userData={userData}
						setUserData={setUserData}
						currentProject={currentProject}
						allEmployees={allEmployees}
						setCurrentProject={setCurrentProject}
						setSelectedIndex={setSelectedIndex}
					/>
				)}
				{userData && modals.editProjectForm && (
					<EditProjectForm
						user={user}
						setViewMode={setViewMode}
						modals={modals}
						closeModals={closeModals}
						setProjects={setProjects}
						dashboardProjects={dashboardProjects}
						setDashboardProjects={setDashboardProjects}
						userData={userData}
						setUserData={setUserData}
						currentProject={currentProject}
						allEmployees={allEmployees}
						modalProject={modalProject}
					/>
				)}
				<Offset />

				<Box sx={{ display: 'flex' }}>
					<Box
						sx={{
							flexGrow: 1
						}}
					>
						<List component="nav" aria-label="main mailbox folders">
							{userData &&
								userData.map((project) => (
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
										userData={userData}
										modals={modals}
										openModals={openModals}
										closeModals={closeModals}
										selectModal={selectModal}
									/>
								))}
							{user.access_level == MANAGER_LEVEL && (
								<ListItemButton value="Create New Project" sx={{ mx: 2 }}>
									<ListItemText
										primary="Create New Project"
										onClick={() => openModals('newProjectForm')}
									/>
									<AddIcon
										fontSize="large"
										sx={{ color: 'background.default', mx: 2 }}
									/>
								</ListItemButton>
							)}
						</List>
					</Box>
					<Box>
						<Button
							sx={{
								zIndex: 0,
								position: 'absolute',
								height: '100%',
								minWidth: '10px',
								maxWidth: '10px',
								width: '10px',
								right: '0px',
								top: '0px',
								backgroundColor: 'primary.dark',
								borderLeft: `1px solid ${theme.palette.divider}`,
								'&:hover': {
									backgroundColor: 'secondary.light'
								}
							}}
							onClick={toggleDrawer}
						>
							<ArrowLeftIcon
								color="inherit"
								aria-label="open drawer"
								edge="start"
								sx={{
									color: 'secondary.main',
									position: 'absolute',
									top: '50%',
									right: '-25%'
								}}
							/>
						</Button>
					</Box>
				</Box>
			</Drawer>
		</ThemeProvider>
	);
}
