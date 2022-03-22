import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProjectTicket from './ProjectTicket'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NEW_TICKET_FORM } from './constants/Modes'
import { Droppable, Draggable } from 'react-beautiful-dnd'

export default function ProjectColumn (props) {
  const { user, column, setViewMode, setCurrentColumn, colIndex } = props

  const [tickets, setTickets] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false);

  // handle opening and closing of MoreHorizIcon
  const [anchorEl, setAnchorEl] = useState(null);
  const openIconMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget)
    console.log(anchorEl)
  };
  
  const closeIconMenu = () => {
    setAnchorEl(null);
  };

  const openRemoveDialog = () => {
    setDialogOpen(true);
  }

  const remove = () => {
    setDialogOpen(false);
    console.log(column)
  };

  const closeRemoveDialog = () => {
    setDialogOpen(false);
  };

  useEffect(
		() => {
  setTickets(column.Tickets)
},
		[column]
	)

  const createNewTicket = () => {
    setCurrentColumn(column.id)
    setViewMode(NEW_TICKET_FORM)
  }

  return (
    <Draggable draggableId={column.name} index={colIndex}>
      {provided =>
        <Box
          sx={{ width: '20rem', mx: '1rem', backgroundColor: 'white' }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
				>
          <ListItem sx={{ padding: '0.1rem' }}>
            <ListItemButton>
              <ListItemText primary={column.name} />
              <IconButton
                id="fade-button"
                aria-controls={openIconMenu ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openIconMenu ? 'true' : undefined}
                onClick={handleClick}
              >  
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={openIconMenu}
                onClose={closeIconMenu}
                TransitionComponent={Fade}
             >
              <MenuItem onClick={closeIconMenu}>Change Name</MenuItem>
              <MenuItem onClick={openRemoveDialog}>Remove</MenuItem>
            </Menu>
            </ListItemButton>
          </ListItem>

          <Dialog open={dialogOpen} onClose={closeRemoveDialog}>
            
            <DialogTitle>{"Column removal?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                You still have tickets in this column. 
                Column removal will permanently delete all associated ticket. 
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeRemoveDialog}>Cancel</Button>
              <Button onClick={remove}>Remove</Button>
            </DialogActions>
          </Dialog>
          <Divider />

          <Droppable droppableId={column.name} type='ticket'>
            {(provided, snapshot) =>
              <List
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                sx={{
                  backgroundColor: snapshot.isDraggingOver
										? 'skyblue'
										: 'inherit',
                  transition: 'background-color 1s ease'
                }}
							>
                <ColumnTickets tickets={tickets} setViewMode={setViewMode} />
                {provided.placeholder}
              </List>}
          </Droppable>
          <ListItem sx={{ padding: '0.1rem' }}>
            <ListItemButton onClick={() => createNewTicket()}>
              <ListItemText primary="Create New Ticket" />
            </ListItemButton>
          </ListItem>
        </Box>}
    </Draggable>
  )
}

// React.memo(function ColumnTickets(props)
const ColumnTickets = React.memo(function ColumnTickets (props) {
  const { tickets, setViewMode } = props
  return tickets.map((ticket, index) => {
    return (
      <Draggable
        key={'' + ticket.id}
        draggableId={'ticket_' + ticket.id}
        index={index}
			>
        {(provided, snapshot) =>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
					>
            <ProjectTicket
              title={ticket.title}
              ticketId={ticket.id}
              isDragging={snapshot.isDragging}
              setViewMode={setViewMode}
						/>
          </div>}
      </Draggable>
    )
  })
})
