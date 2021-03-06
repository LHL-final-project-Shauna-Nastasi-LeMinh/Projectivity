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
import Accordion from '@mui/material/Accordion';
import { Slide } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { theme } from './Theme';
import ClearIcon from '@mui/icons-material/Clear';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function NotificationDrawer(props) {
	const {
		notifications,
		setNotifications,
		notifyOpen,
		setNotifyOpen,
		toggleDrawer,
		drawerWidth
	} = props;

	const temp_notifications = [
		'A new ticket has been added',
		'A new column has been added',
		'You have been assigned a new ticket',
		'You have overdue tickets!'
	];

	return (
		<Accordion
			expanded={notifyOpen}
			onChange={toggleDrawer}
			hidden={!notifyOpen}
			// TransitionComponent={Slide}
			// TransitionProps={{
			// 	mountOnEnter: true,
			// 	unmountOnExit: true,
			// 	timeout: { enter: 225 }
			// }}
			elevation={0}
			sx={{
				position: 'fixed',
				top: '4rem',
				right: '6rem',
				zIndex: (theme) => theme.zIndex.appBar + 1,
				width: '25rem'
			}}
		>
			<AccordionDetails
				sx={{
					height: '1rem',
					zIndex: 2,
					bgcolor: 'primary.main',
					border: `1px solid ${theme.palette.divider}`,
					'&:hover': {
						backgroundColor: 'secondary.light'
					}
				}}
			>
				<Typography
					fontSize="medium"
					variant="body2"
					sx={{
						color: 'background.paper',
						textTransform: 'uppercase',
						fontWeight: 'bold',
						color: 'background.default',
						textTransform: 'none'
					}}
				>
					Notifications
				</Typography>
			</AccordionDetails>
			{notifyOpen &&
				notifications &&
				notifications.map((notif, index) => {
					return (
						<AccordionDetails
							sx={{
								height: '0.5rem',
								zIndex: 2,
								backgroundColor: notif.unread ? 'primary.light' : '#FFFFFF',
								borderBottom: `1px solid ${theme.palette.divider}`,
								'&:hover': {
									backgroundColor: 'secondary.light'
								},
								borderLeft: `1px solid ${theme.palette.divider}`,
								borderRight: `1px solid ${theme.palette.divider}`,
								textTransform: 'none'
							}}
						>
							<Typography
								noWrap
								fontSize="small"
								sx={{
									color: notif.unread ? 'background.default' : 'primary.main'
								}}
							>
								{notif.message}
							</Typography>
						</AccordionDetails>
					);
				})}
		</Accordion>
	);
}
