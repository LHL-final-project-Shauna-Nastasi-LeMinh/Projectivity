import React, { useState } from 'react';
import axios from 'axios';
import {
	Button,
	Modal,
	Typography,
	Box,
	TextField,
	Divider,
	Paper
} from '@mui/material';
import { AddBox } from '@mui/icons-material';
import { PROJECT_VIEW } from '../constants/Modes';

export default function DeleteProjectForm(props) {
	const {
		currentProject,
		setCurrentProject,
		data,
		setViewMode,
		user,
		setUser,
		open,
		setOpen,
		modals,
		openModals,
		closeModals,
		setRefresh,
		dashboardProjects,
		setDashboardProjects,
		userData,
		setSelectedIndex,
		modalProject
	} = props;
	const [values, setValues] = useState({
		message: '',
		confirm: undefined
	});

	// const filteredProjects = dashboardProjects.filter((project) => {
	// 	if (project.id !== currentProject.id) {
	// 		return project;
	// 	}
	// });

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const delete_confirmed = (event) => {
		if (values.confirm === 'DELETE') {
			axios
				.delete(
					process.env.REACT_APP_BACKEND_URL +
						`/projects/${modalProject.id}/delete`,
					{
						project_id: modalProject.id
					}
				)
				.then((res) => {
					// setDashboardProjects(filteredProjects);

					const projectIndex = userData.findIndex(
						(project) => project.id === modalProject.id
					);

					userData.splice(projectIndex, 1);
					if (currentProject === modalProject) {
						if (projectIndex === userData.length) {
							setCurrentProject(userData[projectIndex - 1]);
							setSelectedIndex(projectIndex - 1);
						} else {
							setCurrentProject(userData[projectIndex]);
							setSelectedIndex(projectIndex);
						}
					}

					
				})
				.catch(function (error) {
					console.log(error.message);
					setValues({ ...values, message: 'Form invalid' });
				});
			closeModals('deleteProjectForm');
		}
	};

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 'fit-content',
		height: 'fit-content',
		backgroundColor: 'primary.main',
		boxShadow: 24
	};

	return (
		<Modal
			open={modals.deleteProjectForm}
			onClose={() => closeModals('deleteProjectForm')}
			aria-labelledby="modal-login-form"
			aria-describedby="modal-modal-login-form"
		>
			<Paper sx={style}>
				<Box
					sx={{
						backgroundColor: 'primary.main',
						color: 'background.default',
						m: 2
					}}
				>
					<Typography variant="h4" align="center">
						<AddBox color="secondary" fontSize="large" />
					</Typography>
					<Typography variant="h4" align="center">
						Delete A Project
					</Typography>
				</Box>

				<Divider />

				<Box sx={{ width: '100%', backgroundColor: 'background.default' }}>
					<Box sx={{ display: 'flex', width: '100%' }}>
						<TextField
							sx={{ m: 2 }}
							label="Type DELETE to confirm"
							value={values.confirm}
							type="text"
							onChange={handleChange('confirm')}
							helperText={values.confirm === '' && 'Required field'}
							error={values.confirm === ''}
							required
						/>
					</Box>
				</Box>

				<Divider />

				<Box
					sx={{
						display: 'flex',
						backgroundColor: 'primary.main',
						color: 'background.default',
						my: 3
					}}
				>
					<Button
						sx={{ mx: 2, width: '100%' }}
						color="error"
						size="large"
						variant="contained"
						onClick={() => delete_confirmed()}
					>
						Delete
					</Button>
					<Button
						sx={{ mx: 2, width: '100%' }}
						color="secondary"
						size="large"
						variant="contained"
						onClick={() => closeModals('deleteProjectForm')}
					>
						Cancel
					</Button>
				</Box>
			</Paper>
		</Modal>
	);
}
