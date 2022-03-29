import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
	LANDING_VIEW,
	LOGIN_FORM,
	REGISTER_FORM,
	ABOUT_VIEW
} from './constants/Modes';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { HR_LEVEL } from './constants/AccessLevel';
import { NOTIF_CHANNEL, NOTIF_NEW_EVENT } from './constants/PusherChannels';
import Pusher from 'pusher-js';
import { SettingsBluetoothOutlined } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/system';
import NotificationDrawer from './NotificationDrawer';
import Accordion from '@mui/material/Accordion';
import { Slide } from '@mui/material';
import { theme, logoTheme } from './Theme';
import CircleIcon from '@mui/icons-material/Circle';
import { ThemeProvider } from '@mui/private-theming';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const page_strings = ['About', 'Login', 'Register'];
const page_views = [ABOUT_VIEW, LOGIN_FORM, REGISTER_FORM];
const settings = ['Logout'];
const setting_views = [LANDING_VIEW, LANDING_VIEW, LANDING_VIEW, LANDING_VIEW];

export default function NavbarMenu(props) {
	const {
		viewMode,
		setViewMode,
		user,
		setUser,
		modals,
		openModals,
		setStartBuild,
		clearUserData,
		notifications,
		setNotifications,
		notifyOpen,
		setNotifyOpen,
		toggleDrawer,
		unreadNotifLength,
		setUnreadNotifLength,
		drawerWidth,
		closeDrawer
	} = props;
	const [email, setEmail] = useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	function logout() {
		// a axios call to clear cookie session in server side too
		axios
			.get(process.env.REACT_APP_BACKEND_URL + '/accessControl/logout')
			.then((res) => {
				setUser(null);
				setStartBuild(false);
				setViewMode(false);
			})
			.catch((err) => {
				console.log(err);
			});
		clearUserData();

		setAnchorElUser(null);
	}

	useEffect(() => {
		if (user) {
			setEmail(user.email);
			updateNotifications();
		}
	}, [user]);

	// WebSocket code start
	useEffect(() => {
		const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
			cluster: process.env.REACT_APP_PUSHER_CLUSTER
		});
		const channel = pusher.subscribe(NOTIF_CHANNEL);
		channel.bind(NOTIF_NEW_EVENT, function (notif_to_id) {
			if (!notif_to_id) return;
			if (!user) return;
			if (notif_to_id === user.id) return;
			updateNotifications();
		});
		return () => channel.unbind(NOTIF_NEW_EVENT);
	}, []);

	const updateNotifications = function () {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + `/notifications/${user.id}`)
			.then((res) => {
				if (res.data) {
					setNotifications(res.data);
					const length = res.data.filter(
						(notif) => notif.unread === true
					).length;
					setUnreadNotifLength(length === 0 ? null : length);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// WebSocket code end

	const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

	return (
		<AppBar
			position="fixed"
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1,
				width: '100%'
				// borderBottom: 1,
				// borderColor: 'divider'
			}}
		>
			<Toolbar>
				<Box
					sx={{
						display: 'flex',
						height: 'fit-content',
						justifyContent: 'space-between',
						alignContent: 'center',
						flexGrow: 1
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignContent: 'center',
							mx: 1
						}}
					>
						<Typography
							variant="h4"
							theme={logoTheme}
							sx={{
								alignSelf: 'center',
								mx: 1,
								color: 'secondary.main',
								'&:hover': {
									color: 'secondary.light'
								}
							}}
						>
							Projectivity
						</Typography>
						<Typography
							variant="h6"
							theme={logoTheme}
							sx={{
								alignSelf: 'center',
								mx: 1,
								color: 'background.default'
							}}
						>
							Keep your project on track
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignContent: 'center',
							alignItems: 'center',
							justifyContent: 'space-between'
						}}
					>
						{user && (
							<ClickAwayListener onClickAway={closeDrawer}>
								<Button onClick={() => toggleDrawer()}>
									{unreadNotifLength <= 0 && (
										<NotificationsIcon
											disableRipple
											sx={{
												position: 'absolute',
												zIndex: 1,
												color: 'background.default',
												px: '0.5rem',
												'&:hover': {
													color: 'secondary.light'
												}
											}}
										/>
									)}
									{unreadNotifLength > 0 && (
										<Box
											sx={{ display: 'flex' }}
											onClick={() => setNotifyOpen(!notifyOpen)}
										>
											<NotificationsActiveIcon
												disableRipple
												fontSize="large"
												sx={{
													color: 'background.default',
													'&:hover': {
														color: 'secondary.light'
													}
												}}
											/>
											<CircleIcon
												disableRipple
												sx={{
													position: 'absolute',
													height: '20px',
													right: '10px',
													top: '10px',
													zIndex: 1,
													color: 'secondary.main'
												}}
											/>
											<Typography
												sx={{
													position: 'absolute',
													fontSize: '12px',
													right: '19px',
													top: '11px',
													zIndex: 1,
													color: '#FFFFFF'
												}}
											>
												{unreadNotifLength}
											</Typography>
										</Box>
									)}
									{unreadNotifLength >= 0 && (
										<NotificationDrawer
											notifications={notifications}
											setNotifications={setNotifications}
											notifyOpen={notifyOpen}
											setNotifyOpen={setNotifyOpen}
											toggleDrawer={toggleDrawer}
										/>
									)}
								</Button>
							</ClickAwayListener>
						)}
						<Box sx={{ display: 'flex' }}>
							{!user && (
								<ButtonGroup
									orientiation={{ vertical: 'top', horizontal: 'right' }}
									variant="text"
								>
									<Button
										key="about"
										onClick={() => setViewMode(false)}
										sx={{
											color: 'white',
											display: 'block',
											px: '0.5rem',
											'&:hover': {
												color: 'secondary.light'
											}
										}}
									>
										About
									</Button>
									<Button
										key="login"
										onClick={() => openModals('loginForm')}
										sx={{
											color: 'white',
											display: 'block',
											px: '0.5rem',
											'&:hover': {
												color: 'secondary.light'
											}
										}}
									>
										Login
									</Button>
								</ButtonGroup>
							)}

							{user && (
								<Box>
									<Box sx={{ display: 'flex' }}>
										<Typography
											variant="subtitle1"
											sx={{ alignSelf: 'center', px: '0.5rem' }}
										>
											{email}
										</Typography>

										{user && user.access_level == HR_LEVEL && (
											<Button
												key="register"
												sx={{
													color: 'white',
													display: 'block',
													px: '0.5rem',
													'&:hover': {
														color: 'secondary.light'
													}
												}}
												onClick={() => openModals('registerForm')}
											>
												Add Employee
											</Button>
										)}
										{user && (
											<Button
												key="logout"
												onClick={() => logout()}
												sx={{ color: 'white', display: 'block', px: '0.5rem' }}
											>
												<Typography
													variant="subtitle2"
													sx={{
														alignSelf: 'center',
														px: '0.5rem',
														'&:hover': {
															color: 'secondary.light'
														}
													}}
												>
													Logout
												</Typography>
											</Button>
										)}
									</Box>
								</Box>
							)}
						</Box>
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
