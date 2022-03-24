import React, { useEffect, useState, forwardRef } from 'react'
import axios from 'axios'
import ProjectTicket from './ProjectTicket'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { ADD_TICKET } from './constants/Modes'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Slide from '@mui/material/Slide'
import ColumnTickets from './ColumnTickets'

const Transition = forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function ProjectColumn (props) {
  const {
		state,
		column,
		colIndex,
		deleteColumnFromProjectView,
		changeColumnFromProjectView
	} = props

  const [tickets, setTickets] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState({})
  const [newColumnName, setNewColumnName] = useState('')

	// handle opening and closing of MoreHorizIcon
  const [anchorEl, setAnchorEl] = useState(null)
  const openIconMenu = Boolean(anchorEl)

  const menuIconClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const closeIconMenu = () => {
    setAnchorEl(null)
  }

  const openDeleteDialog = () => {
    closeIconMenu()
    const content = {}
    content.title = `Delete column "${column.name}"?`
    content.text = ''

    if (tickets && tickets.length > 0) {
      content.text = `You still have tickets in this column.
        Column deletion will permanently delete all associated tickets.`
    }
    content.confirmLabel = 'Delete'
    setDialogContent(content)
    setDialogOpen(true)
  }

  const handleColumnActions = () => {
    closeDialog()
    if (dialogContent.confirmLabel === 'Delete') {
      deleteColumnFromProjectView(column.id)
    }
    if (dialogContent.confirmLabel === 'Change') {
      if (newColumnName === '') return
      changeColumnFromProjectView(column.id, newColumnName)
    }
  }

  const openNewColumnNameDialog = () => {
    closeIconMenu()
    const content = {}
    content.title = `New name for column "${column.name}"?`
    content.text = ''
    content.confirmLabel = 'Change'
    setDialogContent(content)
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
  }

  useEffect(
		() => {
  setTickets(column.Tickets)
},
		[column]
	)

  const createNewTicket = () => {
    state.openModal('newTicketForm')
  }

  const setTextValue = function (event) {
    setNewColumnName(event.target.value)
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
                id='fade-button'
                aria-controls={openIconMenu ? 'fade-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={openIconMenu ? 'true' : undefined}
                onClick={menuIconClick}
							>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id='fade-menu'
                MenuListProps={{
                  'aria-labelledby': 'fade-button'
                }}
                anchorEl={anchorEl}
								// open={openIconMenu}
                onClose={closeIconMenu}
                TransitionComponent={Fade}
							>
                <MenuItem onClick={openNewColumnNameDialog}>
									Change Name
								</MenuItem>
                <MenuItem onClick={openDeleteDialog}>Delete</MenuItem>
              </Menu>
            </ListItemButton>
          </ListItem>

          <Dialog
            open={dialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={closeDialog}
            aria-describedby='alert-dialog-slide-description'
					>
            <DialogTitle>
              {dialogContent.title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-slide-description'>
                {dialogContent.text}
              </DialogContentText>
              {dialogContent.confirmLabel === 'Change' &&
              <TextField
                autoFocus
                margin='dense'
                id='name'
                label='New Column Name'
                fullWidth
                variant='outlined'
                onChange={setTextValue}
								/>}
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Cancel</Button>
              <Button onClick={handleColumnActions}>
                {dialogContent.confirmLabel}
              </Button>
            </DialogActions>
          </Dialog>
          <Divider />

          <Droppable droppableId={column.name} type='ticket'>
            {(provided, snapshot) =>
              <List
                {...provided.droppableProps}
                ref={provided.innerRef}
                isdraggingover={snapshot.isdraggingover}
                sx={{
                  backgroundColor: snapshot.isdraggingover
										? 'skyblue'
										: 'inherit',
                  transition: 'background-color 1s ease'
                }}
							>
                <ColumnTickets
                  state={state}
                  tickets={state.currentTickets}
                  currentTicket={state.currentTicket}
									// open={open}
									// setCurrentTicket={setCurrentTicket}
                  setTickets={setTickets}
								/>
                {provided.placeholder}
              </List>}
          </Droppable>
          <ListItem sx={{ padding: '0.1rem' }}>
            <ListItemButton>
              <ListItemText
                primary='Create New Ticket'
                onClick={() => createNewTicket()}
							/>
            </ListItemButton>
          </ListItem>
        </Box>}
    </Draggable>
  )
}

// React.memo(function ColumnTickets(props)
// const ColumnTickets = React.memo(function ColumnTickets (props) {
//   const { tickets, setViewMode, setOpen, currentTicket, setCurrentTicket, setTickets, open} = props
//   return tickets.map((ticket, index) => {
//     return (
//       <Draggable
//         key={'' + ticket.id}
//         draggableId={'ticket_' + ticket.id}
//         index={index}
// 			>
//         {(provided, snapshot) =>
//           <div
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             ref={provided.innerRef}
// 					>
//             <ProjectTicket
//               title={ticket.title}
//               ticketId={ticket.id}
//               isDragging={snapshot.isDragging}
//               setViewMode={setViewMode}
//               open={open}
//               setOpen={setOpen}
//               currentTicket={currentTicket}
//               setCurrentTicket={setCurrentTicket}
//               tickets={tickets}
//               setTickets={setTickets}
// 						/>
//           </div>}
//       </Draggable>
//     )
//   })
// })
