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
import MenuIcon from '@mui/icons-material/Menu';

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
		userData,
		selectModal
	} = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	function handleClick(target, event, index) {
		console.log(target, open, anchorEl);
		if (open === false) {
			if (target === 'menu') {
				setAnchorEl(event.currentTarget);
				event.stopPropagation();
			} else {
				selectProject(index);
				setSelectedIndex(index);
			}
		}
	}

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<ListItemButton
			selected={selectedIndex === listIndex}
			onClick={(event) => {
				handleClick('listItem', event, listIndex);
			}}
		>
			<FolderIcon sx={{ mx: 1, color: 'primary.light' }} />
			<ListItemText key={key} primary={value} />
			<IconButton
				onClick={(event) => {
					handleClick('menu', event, listIndex);
				}}
				id="demo-positioned-button"
				aria-controls={open ? 'demo-positioned-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
			>
				<MenuIcon fontSize="medium" sx={{ color: 'background.default' }} />
			</IconButton>
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
				<MenuItem
					onClick={() => selectModal('editProjectForm', dashItemProject)}
				>
					<EditIcon fontSize="small" />
					Edit Project
				</MenuItem>
				<MenuItem
					onClick={() => selectModal('deleteProjectForm', dashItemProject)}
				>
					<DeleteIcon fontSize="small" />
					Delete Project
				</MenuItem>
			</Menu>
		</ListItemButton>
	);
}
