import React, { useState } from 'react'
import Button from '@mui/material/Button'
import axios from 'axios'

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})




export default function RemoveTicket (props) {

  const {open, setOpen, currentTicket} = props

  const onConfirmDelete = () => {
  
    axios
      .delete(process.env.REACT_APP_BACKEND_URL + `/tickets/${currentTicket}`)
      .then(res => {
        console.log(res.data)
       setOpen(false)
      })
      .catch(function (error) {
        console.log(error.message)
    })
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
   
      <Dialog 
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'>

        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onConfirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

  );

}