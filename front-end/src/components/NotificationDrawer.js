import React, { useRef } from 'react';
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
import { createStyles } from '@mui/material';
import { drawerClasses } from '@mui/material';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function NotificationDrawer(props) {
	const {
		notifications,
		setNotifications,
		notifyOpen,
		setNotifyOpen,
		toggleDrawer
	} = props;

	const containerRef = useRef();

	const temp_notifications = [
		'A new ticket has been added',
		'A new column has been added',
		'You have been assigned a new ticket',
		'You have overdue tickets!'
	];

	return (
		<Box
			anchor="top"
			role="presentation"
			onOpen={toggleDrawer(true)}
			onClose={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			{notifyOpen && (
				<Drawer
					anchor="top"
					open={notifyOpen}
					onOpen={toggleDrawer(true)}
					onClose={toggleDrawer(false)}
					hideBackdrop={true}
				>
					<List>
						{temp_notifications.map((text) => {
							return (
								<ListItem>
									<ListItemText primary={text} />
								</ListItem>
							);
						})}
					</List>
				</Drawer>
			)}
		</Box>
	);
}
