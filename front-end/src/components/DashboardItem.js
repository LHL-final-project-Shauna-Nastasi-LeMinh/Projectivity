import React, { useState } from 'react'
import { ListItemButton, ListItemText } from '@mui/material/'
import ListItemIcon from '@mui/material/ListItemIcon'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
export default function DashboardItem (props) {
  const { state, value, primary, key } = props

  console.log('dashboarditem')

  return (
    <ListItemButton>
      <ListItemIcon />
      <ListItemText
        key={key}
        value={value}
        primary={primary}
        onClick={() => state.setStateTarget('currentProject', value)}
			/>
      <EditIcon />
      <DeleteIcon onClick={() => state.openModal('deleteProjectForm')} />
    </ListItemButton>
  )
}
