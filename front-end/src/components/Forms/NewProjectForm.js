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
import { AddBox, CircleNotifications } from '@mui/icons-material';
import { PROJECT_VIEW } from '../constants/Modes';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

export default function NewProjectForm(props) {
	const {
		user,
		dashboardProjects,
		setDashboardProjects,
		setProjects,
		columns,
		setColumns,
		modals,
		closeModals,
		allEmployees,
		userData,
		setUserData,
		currentProject,
		setCurrentProject,
		setSelectedIndex
	} = props;
	const [values, setValues] = useState({
		message: '',
		name: undefined,
		description: undefined
	});
	const [assignees, setAssignees] = useState([]);

	console.log('### assignees', assignees);

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	function buildEmployeeList() {
		const mappedEmployees = {};
		allEmployees.forEach((employee) => {
			const fullname = employee.first_name + ' ' + employee.last_name;
			mappedEmployees[fullname] = employee.id;
		});
		return mappedEmployees;
	}

	function createNewProject() {
		if (typeof values.name === 'undefined' || values.name === '') {
			setValues((prev) => {
				return { ...prev, name: '' };
			});
			return;
		}
		//assign employee to the project
		const mappedEmployees = buildEmployeeList();
		const assigneeIds = assignees.map((fullname) => mappedEmployees[fullname]);
		const params = {
			assigneeIds,
			name: values.name,
			description: values.description,
			employee_id: user.id,
			creator: user.first_name + ' ' + user.last_name
		};
		axios
			.post(
				process.env.REACT_APP_BACKEND_URL + '/projects/new',
				JSON.stringify(params),
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			.then((res) => {
				axios
					.get(process.env.REACT_APP_BACKEND_URL + `/projects/${user.id}`)
					.then((res) => {
						const data = res.data.map(
							(project_assignment) => project_assignment.Project
						);
						setDashboardProjects(data);
						// setProjects(data)
						const newProject = res.data[res.data.length - 1];
						axios
							.post(
								process.env.REACT_APP_BACKEND_URL + '/columns/new/default',
								{
									project_id: newProject.id
								}
							)
							.then((res) => {
								console.log('success', res.data);
								newProject.Columns = res.data;
								newProject.Columns.map((column) => {
									if (!column.Tickets) {
										column.Tickets = [];
									}
								});
								userData.push(newProject);
								setUserData(userData);
								setCurrentProject(userData[userData.length - 1]);
								setSelectedIndex(userData.length - 1);
							})
							.catch(function (error) {
								console.log(error.message);
							});
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch(function (error) {
				console.log(error.message);
				setValues({ ...values, message: 'Form invalid' });
			});
		closeModals('newProjectForm');
	}

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

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		root: {
			backgroundColor: 'primary.main',
			color: 'background.default'
		},
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
				// backgroundColor: 'primary.main'
			}
		}
	};

	const handleSelectChange = (event) => {
		const {
			target: { value }
		} = event;
		setAssignees(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	return (
		<Modal
			open={modals.newProjectForm}
			onClose={() => closeModals('newProjectForm')}
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
						Create A New Project
					</Typography>
				</Box>

				<Divider />

				<Box sx={{ width: '100%', backgroundColor: 'background.default' }}>
					<TextField
						sx={{ m: 2, width: '90%' }}
						label="Project Title"
						value={values.name}
						type="text"
						onChange={handleChange('name')}
						helperText={values.name === '' && 'Required field'}
						error={values.name === ''}
						required
					/>
				</Box>

				<Box sx={{ width: '100%', backgroundColor: 'background.default' }}>
					<FormControl sx={{ m: 2, width: '90%' }}>
						<InputLabel id="demo-multiple-checkbox-label">Employees</InputLabel>
						<Select
							labelId="demo-multiple-checkbox-label"
							id="demo-multiple-checkbox"
							multiple
							value={assignees}
							onChange={handleSelectChange}
							input={<OutlinedInput label="Employees" />}
							renderValue={(selected) => selected.join(', ')}
						>
							{allEmployees.map((employee) => (
								<MenuItem
									sx={{
										color: 'background.default',
										'&:hover': {
											backgroundColor: 'secondary.light'
										}
									}}
									key={employee.id}
									value={employee.first_name + ' ' + employee.last_name}
								>
									<Checkbox
										checked={
											assignees.indexOf(
												employee.first_name + ' ' + employee.last_name
											) > -1
										}
										value={employee.id}
										color="secondary"
										sx={{
											color: 'secondary.main',
											'&:hover': {
												color: 'secondary.light'
											}
										}}
									/>
									<ListItemText
										primary={employee.first_name + ' ' + employee.last_name}
									/>
								</MenuItem>
							))}
						</Select>
					</FormControl>
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
						sx={{ mx: 2, width: '50%' }}
						color="success"
						size="large"
						variant="contained"
						onClick={() => createNewProject()}
					>
						Create
					</Button>
					<Button
						sx={{ mx: 2, width: '50%' }}
						color="secondary"
						size="large"
						variant="contained"
						onClick={() => closeModals('newProjectForm')}
					>
						Cancel
					</Button>
				</Box>
			</Paper>
		</Modal>
	);
}
