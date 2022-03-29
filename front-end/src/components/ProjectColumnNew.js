import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import AddIcon from '@mui/icons-material/Add';
import { Draggable } from 'react-beautiful-dnd';
import Slide from '@mui/material/Slide';
import { NEW_COLUMN_FORM } from './constants/Modes';
import Bin from './Bin';
import { Grid } from '@mui/material';
import { theme } from './Theme';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProjectColumnNew(props) {
	const { createNewColumn, columnsCount, openModals } = props;
	const [open, setOpen] = useState(false);
	const [newColumnName, setNewColumnName] = useState('');

	const create = () => {
		setOpen(false);
		if (newColumnName === '') return;
		createNewColumn(newColumnName);
		setNewColumnName('');
	};

	const setTextValue = function (event) {
		setNewColumnName(event.target.value);
	};

	return (
		<Draggable draggableId={`newColumn`} index={columnsCount} isDragDisabled>
			{(provided) => (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '4rem',
						height: '95%',
						marginRight: '1rem',
						borderLeft: `1px solid ${theme.palette.secondary.main}`,
						backgroundColor: 'primary.main',
						'&:hover': {
							backgroundColor: 'secondary.light'
						}
					}}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<ListItem
						sx={{
							position: 'relative',
							top: '44.75%',
							left: '-425%',
							height: '4rem',
							width: '38rem',
							rotate: '90deg',
							color: 'background.default',
							transition: 'background-color 0.5s ease'
						}}
					>
						<ListItemButton
							disableRipple
							onClick={() => openModals('newColumnForm')}
						>
							<ListItemText primary="Create New Column" />
							<AddIcon disableRipple fontSize="large" />
						</ListItemButton>
					</ListItem>

					<Dialog open={open} onClose={() => setOpen(false)}>
						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="New Column Name"
								fullWidth
								variant="outlined"
								onChange={setTextValue}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={create}>Create</Button>
							<Button onClick={() => setOpen(false)}>Cancel</Button>
						</DialogActions>
					</Dialog>
				</Box>
			)}
		</Draggable>
	);
}
