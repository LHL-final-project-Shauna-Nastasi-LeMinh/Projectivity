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

export default function EditColumnForm(props) {
	const {
		setViewMode,
		user,
		modals,
		openModals,
		closeModals,
		dashboardProjects,
		setDashboardProjects,
		setProjects,
		currentProject,
		setCurrentProject,
		columns,
		editColumn,
		selectedColumn
	} = props;
	const [values, setValues] = useState({
		message: '',
		name: selectedColumn ? selectedColumn.name : undefined
	});

	console.log('edit column form open ###');

	const handleChange = (prop) => (event) => {
		setValues({
			...values,
			[prop]: event.target.value
		});
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

	{
		selectedColumn !== undefined &&
			console.log(
				'#### SELECTED COLUMN',
				selectedColumn.id,
				selectedColumn.name
			);
	}

	function edit() {
		if (typeof values.name === 'undefined' || values.name === '') {
			setValues((prev) => {
				return { ...prev, name: '' };
			});
			return;
		}

		if (selectedColumn !== undefined) {
			closeModals('editColumnForm');
			editColumn(selectedColumn.id, values.name);
		}
	}

	return (
		<Modal
			open={modals.editColumnForm}
			onClose={() => closeModals('editColumnForm')}
			aria-labelledby="modal-login-form"
			aria-describedby="modal-modal-login-form"
			hideBackdrop="false"
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
						Edit A Column
						<AddBox color="secondary" fontSize="large" />
					</Typography>
				</Box>
				<Divider />
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						backgroundColor: 'background.default'
					}}
				>
					<TextField
						sx={{
							width: '100%',
							m: 2
						}}
						label="New Column Name"
						value={values.name}
						type="text"
						onChange={handleChange('name')}
						helperText={values.name === '' && 'Required field'}
						error={values.name === ''}
						required
					/>
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
						sx={{
							mx: 2,
							width: '100%'
						}}
						color="success"
						size="large"
						variant="contained"
						onClick={() => edit()}
					>
						Edit
					</Button>
					<Button
						sx={{
							mx: 2,
							width: '100%'
						}}
						color="secondary"
						size="large"
						variant="contained"
						onClick={() => closeModals('editColumnForm')}
					>
						Cancel
					</Button>
				</Box>
			</Paper>
		</Modal>
	);
}
