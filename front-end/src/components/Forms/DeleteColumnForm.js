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

export default function DeleteColumnForm(props) {
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
		deleteColumn,
		selectedColumn,
		setSelectedColumn
	} = props;
	const [values, setValues] = useState({
		message: '',
		confirm: undefined
	});

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

	return (
		<Modal
			open={modals.deleteColumnForm}
			onClose={() => closeModals('deleteColumnForm')}
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
						Delete A Column
						<AddBox color="secondary" fontSize="large" />
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
						sx={{
							mx: 2,
							width: '100%'
						}}
						color="error"
						size="large"
						variant="contained"
						onClick={() => {
							if (values.confirm === 'DELETE') {
								deleteColumn(selectedColumn.id);
							}
						}}
					>
						Delete
					</Button>
					<Button
						sx={{
							mx: 2,
							width: '100%'
						}}
						color="secondary"
						size="large"
						variant="contained"
						onClick={() => closeModals('deleteColumnForm')}
					>
						Cancel
					</Button>
				</Box>
			</Paper>
		</Modal>
	);
}
