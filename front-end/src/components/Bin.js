import axios from 'axios';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import DeleteIcon from '@mui/icons-material/Delete';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Typography } from '@mui/material';

export default function Bin(props) {
	return (
		<Droppable droppableId="ticket_bin" direction="horizontal" type="ticket">
			{(provided) => (
				<Box
					sx={{
						position: 'absolute',
						display: 'flex',
						justifyContent: 'center',
						left: '0.75rem',
						top: '0.5rem',
						width: '18.5rem',
						height: '9.25rem',
						backgroundColor: 'rgb(249,65,68,0.8)',
						'&:hover': {
							backgroundColor: 'rgb(249,65,68, 1)'
						}
					}}
					{...provided.droppableProps}
					ref={provided.innerRef}
				>
					<Typography
						fontSize="large"
						sx={{
							position: 'fixed',
							alignSelf: 'center',
							color: 'background.default'
						}}
					>
						{'Drag Tickets Here To Delete'}
					</Typography>
					{provided.placeholder}
				</Box>
			)}
		</Droppable>
	);
}
