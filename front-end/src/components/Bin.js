import axios from 'axios';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import DeleteIcon from '@mui/icons-material/Delete';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export default function Bin(props) {
	return (
		<Droppable droppableId="ticket_bin" direction="horizontal" type="ticket">
			{(provided) => (
				<Box
					sx={{ width: '20rem', mx: '1rem', backgroundColor: 'white' }}
					{...provided.droppableProps}
					ref={provided.innerRef}
				>
					<ListItem sx={{ padding: '0.1rem' }}>
						<ListItemText primary="Remove" />
						<DeleteIcon fontSize="large" />
					</ListItem>
					{provided.placeholder}
				</Box>
			)}
		</Droppable>
	);
}
