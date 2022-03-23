import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Draggable } from 'react-beautiful-dnd'

export default function ProjectColumnNew (props) {
  const { name, createNewColumn, columnsCount} = props
  const [open, setOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  const cancel = () => {
    setOpen(false);
  };

  const create = () => {
    setOpen(false);
    if (newColumnName === "") return;
    createNewColumn(newColumnName);
    setNewColumnName("");
  };

  const openNewColumnDialog = function(event) {
    setOpen(true);
  }

  const setTextValue = function(event) {
    setNewColumnName(event.target.value);
  }

  return (
    <Draggable draggableId={`newColumn`} index={columnsCount} isDragDisabled={true}>
    {provided =>
      <Box sx={{ width: '20rem', mx: '1rem', backgroundColor: 'white' }}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <ListItem sx={{ padding: '0.1rem' }}> 
          <ListItemButton onClick={openNewColumnDialog}>
            <ListItemText primary={name} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <Dialog open={open} onClose={cancel}>
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
            <Button onClick={cancel}>Cancel</Button>
            <Button onClick={create}>Create</Button>
          </DialogActions>
        </Dialog>
      </Box>}
    </Draggable>

  )
}
