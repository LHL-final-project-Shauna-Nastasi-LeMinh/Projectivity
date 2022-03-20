import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'

export default function ProjectTicket (props) {
  const [checked, setChecked] = React.useState([1])

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <TableRow>
      <TableCell>
        <List
          dense
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
				>
          {[0, 1, 2, 3].map(value => {
            const labelId = `checkbox-list-secondary-label-${value}`
            return (
              <ListItem
                key={value}
                secondaryAction={
                  <Checkbox
                    edge='end'
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
									/>
								}
                disablePadding
							>
                <ListItemButton>
                  <ListItemText
                    id={labelId}
                    primary={`Line item ${value + 1}`}
									/>
                </ListItemButton>
              </ListItem>
            )
          })}
          <ListItem>
            <ListItemButton>
              <ListItemText primary='Create New Ticket' />
            </ListItemButton>
          </ListItem>
        </List>
      </TableCell>
    </TableRow>
  )
}
