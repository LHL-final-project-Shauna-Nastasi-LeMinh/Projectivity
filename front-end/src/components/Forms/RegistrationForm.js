import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Card from '@mui/material/Card'

export default function RegistrationForm (props) {
  const [message, setMessage] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [roleInput, setRoleInput] = useState('')
  const [roles, setRoles] = useState([])
  const [role, setRole] = useState('')
  const [select, setSelect] = useState('')
  const { setUser, setCookie, open, setOpen, setMode } = props

  const handleFirstNameChange = event => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = event => {
    setLastName(event.target.value)
  }
  const handlePhoneChange = event => {
    setPhone(event.target.value)
  }

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleRoleInputChange = event => {
    setRoleInput(event.target.value)
  }

  useEffect(() => {
    axios
			.get(process.env.REACT_APP_BACKEND_URL + '/roles')
			.then(result => {
  const roleOptions = result.data.map(role =>
    <MenuItem value={role.name}>
      {role.name}
    </MenuItem>
				)
  setRole(result.data[0].id)
  setRoles(roleOptions)
})
			.catch(err => {
  console.log(err)
})
  }, [])

  const register = event => {
    axios
			.post(process.env.REACT_APP_BACKEND_URL + '/accessControl/register', {
  first_name: firstName,
  last_name: lastName,
  email: email,
  password: password,
  phone: phone,
  role_id: roleInput
})
			.then(res => {
  setUser(res.data)
  setCookie('user', res.data, {
    path: '/'
  })
})
			.catch(function (error) {
  console.log(error.message)
  setMessage('Registration invalid')
})
  }

  const cancel = event => {
    setOpen(false)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'palette.primary.main',
    border: '2px solid palette.secondary.main',
    boxShadow: 24,
    p: 4
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-login-form'
      aria-describedby='modal-modal-login-form'
		>
      <Card sx={style}>
        <FormControl>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete='off'
					>
            <Typography variant='h4'>Register</Typography>
            <Typography variant='h6'>
							Please enter your details below
						</Typography>
            <Typography variant='h6' sx={{ color: 'palette.error.main' }}>
              {message}
            </Typography>
            <Input
              id='component-firstName-error'
              value={firstName}
              onChange={handleFirstNameChange}
              aria-describedby='component-firstName-error-text'
              required
						/>
            <FormHelperText id='component-firstName-error-text'>
							First Name
						</FormHelperText>
            <Input
              id='component-lastName-error'
              value={lastName}
              onChange={handleLastNameChange}
              aria-describedby='component-lastName-error-text'
              required
						/>
            <FormHelperText id='component-lastName-error-text'>
							Last Name
						</FormHelperText>
            <Input
              id='component-phone-error'
              value={phone}
              type='phone'
              onChange={handlePhoneChange}
              aria-describedby='component-phone-error-text'
              required
						/>
            <FormHelperText id='component-phone-error-text'>
							PhoneNumber
						</FormHelperText>
            <Input
              id='component-email-error'
              value={email}
              type='email'
              onChange={handleEmailChange}
              aria-describedby='component-email-error-text'
              required
						/>
            <FormHelperText id='component-email-error-text'>
							Email Address
						</FormHelperText>
            <Input
              id='component-password-error'
              value={password}
              type='password'
              onChange={handlePasswordChange}
              aria-describedby='component-password-error-text'
              required
						/>
            <FormHelperText id='component-name-error-text'>
							Password
						</FormHelperText>
            <Select
              labelId='demo-roleInput-label'
              id='demo-roleInput-select'
              value={roleInput}
              label='Role'
              onChange={handleRoleInputChange}
              required
						>
              {roles}
            </Select>
            <FormHelperText id='component-name-error-text'>Role</FormHelperText>
            <Button variant='outlined' onClick={register}>
							Login
						</Button>
            <Button variant='outlined' onClick={cancel}>
							Cancel
						</Button>
          </Box>
        </FormControl>
      </Card>
    </Modal>
  )
}
