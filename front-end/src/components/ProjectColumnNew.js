import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import AddSharpIcon from '@mui/icons-material/AddSharp';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Draggable } from 'react-beautiful-dnd'
import Slide from '@mui/material/Slide'
import { NEW_COLUMN_FORM } from './constants/Modes'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function ProjectColumnNew (props) {
  const { createNewColumn } = props
  const [open, setOpen] = useState(false)
  const [newColumnName, setNewColumnName] = useState('')

  const create = () => {
    setOpen(false)
    if (newColumnName === '') return
    createNewColumn(newColumnName)
    setNewColumnName('')
  }

  const setTextValue = function (event) {
    setNewColumnName(event.target.value)
  }

  return (
    <Box sx={{ width: '20rem', mx: '1rem', backgroundColor: 'white' }}>
      <ListItem sx={{ padding: '0.1rem' }}>
        <ListItemButton onClick={() => setOpen(NEW_COLUMN_FORM)} >
            <ListItemText primary='New' />
            <AddCircleIcon fontSize='large'/>
        </ListItemButton>
      </ListItem>
      <Divider />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='New Column Name'
            fullWidth
            variant='outlined'
            onChange={setTextValue}
					/>
        </DialogContent>
        <DialogActions>
          <Button onClick={create}>Create</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
