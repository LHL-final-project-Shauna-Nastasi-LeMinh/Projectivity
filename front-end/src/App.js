import './App.css';
import React, { useState, useEffect, componentDidUpdate } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
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
} from './components/constants/Modes';
import LoginForm from './components/Forms/LoginForm';
import RegistrationForm from './components/Forms/RegistrationForm';
import ProjectView from './components/ProjectView';
import AboutPage from './components/AboutPage';
import Paper from '@mui/material/Paper';
import NewProjectForm from './components/Forms/NewProjectForm';
import NewTicketForm from './components/Forms/NewTicketForm';
import { HR_LEVEL } from './components/constants/AccessLevel';
import HRPage from './components/HRPage';
import NotificationDrawer from './components/NotificationDrawer';

import NavbarMenu from './components/NavbarMenu';
import Dashboard from './components/Dashboard';
import { styled } from '@mui/system';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './components/Theme';

const App = () => {
	const [user, setUser] = useState(null);
	const [currentProject, setCurrentProject] = useState(null);
	const [currentTicket, setCurrentTicket] = useState(null);
	const [currentColumn, setCurrentColumn] = useState(null);
	const [viewMode, setViewMode] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [data, setData] = useState();
	const [dashboard, setDashboard] = useState();
	const [allEmployees, setAllEmployees] = useState();
	const [dashboardProjects, setDashboardProjects] = useState(null);
	const [userProjects, setUserProjects] = useState(null);
	const [userColumns, setUserColumns] = useState(null);
	const [userTickets, setUserTickets] = useState(null);
	const [sentRequest, setSentRequest] = useState(false);
	const [startBuild, setStartBuild] = useState(false);
	const [userData, setUserData] = useState();

	// sets the open or closed state of the notification drawer
	const [notifyOpen, setNotifyOpen] = useState(false);
	// an empty array to push notifications to
	const [notifications, setNotifications] = useState([]);
	const [unreadNotifLength, setUnreadNotifLength] = useState();

	const toggleDrawer = (open) => (event) => {
		console.log('### CLICKED', open, event);
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		// if notification drawer is closed, clear all Unread status and change to Read
		if (open === false && unreadNotifLength && unreadNotifLength > 0) {
			axios
					.get(process.env.REACT_APP_BACKEND_URL + `/notifications/${user.id}/setUnreadAll`)
					.then((res) => {
						const newNotifs = JSON.parse(JSON.stringify(notifications));
						newNotifs.map(notif => notif.unread = false)
						setNotifications(newNotifs)
						setUnreadNotifLength(null)
					})
					.catch((err) => {
						console.log(err);
					});
		}
		setNotifyOpen(open);
	};

	useEffect(() => {
		if (user !== null && !sentRequest) {
			setSentRequest(true);

			axios
				.get(
					process.env.REACT_APP_BACKEND_URL + `/projects/user_data/${user.id}`
				)
				.then((res) => {
					setUserColumns(res.data.userColumns);
					setUserTickets(res.data.userTickets);
					setUserProjects(res.data.userProjects);
				})
				.catch(function (error) {
					console.log(error.message);
				});
		}

		if (user) {
			console.log('### USER', user.access_level, startBuild);
		}

		if (
			userColumns !== null &&
			userTickets !== null &&
			userProjects !== null &&
			!startBuild
		) {
			console.log('GETTING USER DATA');
			setStartBuild(true);
			const newUserData = userProjects;

			newUserData.map((project) => {
				userColumns.map((column) => {
					if (!project.Columns) {
						project.Columns = [];
					}
					if (column.project_id === project.id) {
						if (!project.Columns.includes(column)) {
							project.Columns.push(column);
						}
					}
				});
			});

			newUserData.map((project) => {
				project.Columns.map((column) => {
					userTickets.map((ticket) => {
						if (!column.Tickets) {
							column.Tickets = [];
						}
						if (ticket.column_id === column.id) {
							if (!column.Tickets.includes(ticket)) {
								column.Tickets.push(ticket);
							}
						}
					});
				});
			});

			console.log('### USER DATA', newUserData);

			setUserData(newUserData);
		}
	});

	function clearUserData() {
		console.log('### CLEARING USER DATA');
		// reset user data
		setUser(null);

		// reset request and build
		setStartBuild(false);
		setSentRequest(false);

		// clear stored data
		setUserData(null);
		setUserProjects(null);
		setUserColumns(null);
		setUserTickets(null);
		setCurrentTicket(null);
		setCurrentColumn(null);
		setCurrentProject(null);
		setDashboardProjects(null);
	}

	// MODAL STATE
	const [modals, setModals] = useState({
		loginForm: false,
		registerForm: false,
		newProjectForm: false,
		newTicketForm: false,
		newColumnForm: false,
		editColumnForm: false,
		deleteProjectForm: false,
		deleteColumnForm: false,
		deleteTicketForm: false,
		deleteTicketDragForm: false
	});

	function openModals(prop) {
		// console.log('open modals', prop, modals);
		setModals({ ...modals, [prop]: true });
	}

	function closeModals(prop) {
		// console.log('close modals', prop, modals);
		setModals({ ...modals, [prop]: false });
	}

	const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

	return (
		<Container>
			<ThemeProvider theme={theme}>
				{modals.loginForm && (
					<LoginForm
						setViewMode={setViewMode}
						setUser={setUser}
						modals={modals}
						closeModals={closeModals}
						setRefresh={setRefresh}
						setAllEmployees={setAllEmployees}
					/>
				)}
				{modals.registerForm && (
					<RegistrationForm
						setViewMode={setViewMode}
						setUser={setUser}
						modals={modals}
						closeModals={closeModals}
						setRefresh={setRefresh}
					/>
				)}
				<NavbarMenu
					viewMode={viewMode}
					setViewMode={setViewMode}
					user={user}
					setUser={setUser}
					modals={modals}
					openModals={openModals}
					clearUserData={clearUserData}
					notifications={notifications}
					setNotifications={setNotifications}
					notifyOpen={notifyOpen}
					setNotifyOpen={setNotifyOpen}
					toggleDrawer={toggleDrawer}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					unreadNotifLength={unreadNotifLength}
					setUnreadNotifLength={setUnreadNotifLength}
				/>
				<Offset />
				<NotificationDrawer
					notifications={notifications}
					setNotifications={setNotifications}
					notifyOpen={notifyOpen}
					setNotifyOpen={setNotifyOpen}
					toggleDrawer={toggleDrawer}
				/>
				{user !== null && userData && (
					<Dashboard
						viewMode={viewMode}
						setViewMode={setViewMode}
						user={user}
						setUser={setUser}
						// userProjects={userProjects}
						// setUserProjects={setUserProjects}
						currentProject={currentProject}
						setCurrentProject={setCurrentProject}
						dashboardProjects={dashboardProjects}
						setDashboardProjects={setDashboardProjects}
						userData={userData}
						setUserData={setUserData}
						// data={data}
						// loadForm={loadForm}
						// open={open}
						// setOpen={setOpen}
						modals={modals}
						openModals={openModals}
						closeModals={closeModals}
						allEmployees={allEmployees}
					/>
				)}
				{user !== null &&
					user.access_level == HR_LEVEL &&
					userData !== undefined && <HRPage />}
				{user === null && <AboutPage user={user} />}
				{user !== null &&
					user.access_level != HR_LEVEL &&
					userData !== undefined && (
						<ProjectView
							user={user}
							currentProject={currentProject}
							setCurrentProject={setCurrentProject}
							setViewMode={setViewMode}
							setCurrentColumn={setCurrentColumn}
							currentTicket={currentTicket}
							setCurrentTicket={setCurrentTicket}
							currentColumn={currentColumn}
							modals={modals}
							closeModals={closeModals}
							openModals={openModals}
							userData={userData}
							setUserData={setUserData}
						/>
					)}
			</ThemeProvider>
		</Container>
	);
};

export default App;
