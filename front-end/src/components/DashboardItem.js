import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ADDPROJECT } from './constants/Modes';
import axios from 'axios';
import { PROJECT_VIEW, DELETE_PROJECT_FORM } from './constants/Modes';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { MANAGER_LEVEL } from './constants/AccessLevel';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FolderIcon from '@mui/icons-material/Folder';
import { theme } from './Theme';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function DashboardItem(props) {
	const {
		key,
		project,
		currentProject,
		setCurrentProject,
		dashItemProject,
		viewMode,
		setViewMode,
		value,
		listIndex,
		selectProject,
		loadForm,
		user,
		modals,
		openModals,
		closeModals,
		selectedIndex,
		setSelectedIndex,
		userData
	} = props;
	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleListItemClick = (event, index, project) => {
		selectProject(index);
		setSelectedIndex(index);
	};

	// console.log('###', value, userData);

	return (
		<ListItemButton
			selected={selectedIndex === listIndex}
			onClick={(event) =>
				handleListItemClick(event, listIndex, dashItemProject)
			}
		>
			<ListItemIcon />
			<FolderIcon />
			<ListItemText
				key={key}
				primary={value}
				onClick={(event) =>
					handleListItemClick(event, listIndex, dashItemProject)
				}
			/>
			<Button
				onClick={handleClick}
				id="demo-positioned-button"
				aria-controls={open ? 'demo-positioned-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
			>
				<MoreHorizIcon fontSize="small" color="info" />
			</Button>
			<Menu
				id="demo-positioned-menu"
				aria-labelledby="demo-positioned-button"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
			>
				<MenuItem onClick={() => openModals('editProjectForm')}>
					<ListItemIcon>
						<EditIcon fontSize="small" />
					</ListItemIcon>
					Edit Project
				</MenuItem>
				<MenuItem onClick={() => openModals('deleteProjectForm')}>
					<ListItemIcon>
						<DeleteIcon fontSize="small" />
					</ListItemIcon>
					Delete Project
				</MenuItem>
			</Menu>
		</ListItemButton>
	);
}
