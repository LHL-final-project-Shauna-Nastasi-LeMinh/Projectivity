import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
	Button,
	Modal,
	Typography,
	Box,
	Select,
	MenuItem,
	TextField,
	InputAdornment,
	IconButton,
	Divider,
	Paper
} from '@mui/material'
import { HowToReg, Visibility, VisibilityOff } from '@mui/icons-material'

export default function RegistrationForm (props) {
  const { setUser, setCookie, modals, closeModals } = props

  const [roles, setRoles] = useState([])
  const [role, setRole] = useState()
  const [dropdown, setDropdown] = useState()
  const [values, setValues] = useState({
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
    password: null,
    roleInput: 'Manager',
    showPassword: false
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  useEffect(() => {
    axios
			.get(process.env.REACT_APP_BACKEND_URL + '/roles')
			.then(result => {
        const newMenu = result.data.map(role => 
          <MenuItem value={role.id}>
            {role.name}
          </MenuItem>
        )

  setDropdown(newMenu)
  setRoles(result.data)
})
			.catch(err => {
  console.log(err)
  setValues({ ...values, message: 'Form invalid' })
})
  }, [])

  const register = event => {
    axios
			.post(process.env.REACT_APP_BACKEND_URL + '/accessControl/register', {
  first_name: values.firstName,
  last_name: values.lastName,
  email: values.email,
  password: values.password,
  phone: values.phone,
  role_id: values.roleInput
})
			.then(res => {
  setUser(res.data)
  setCookie('user', res.data, {
    path: '/'
  })
})
			.catch(function (error) {
  console.log(error.message)
  setValues({ ...values, [values.message]: 'Registration invalid' })
})
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    height: 'fit-content',
    backgroundColor: 'primary.main',
    boxShadow: 24
  }

  return (
    <Modal
      open={modals.registerForm}
      onClose={closeModals('registerForm')}
      aria-labelledby='modal-login-form'
      aria-describedby='modal-modal-login-form'
		>
      <Paper sx={style}>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            color: 'background.default',
            m: 2
          }}
				>
          <Typography variant='h4' align='center'>
            <HowToReg color='secondary' fontSize='large' />
          </Typography>
          <Typography variant='h4' align='center'>
						Add Employee
					</Typography>
        </Box>

        <Divider />

        <Box sx={{ width: '100%', backgroundColor: 'background.default' }}>
          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ m: 2 }}
              label='First Name'
              value={values.firstName}
              type='text'
              onChange={handleChange('firstName')}
              helperText={values.firstName === '' && 'Required field'}
              error={values.firstName === ''}
              required
						/>
            <TextField
              sx={{ m: 2 }}
              label='Last Name'
              value={values.lastName}
              type='text'
              onChange={handleChange('lastName')}
              helperText={values.lastName === '' && 'Required field'}
              error={values.lastName === ''}
              required
						/>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ m: 2 }}
              label='Phone Number'
              value={values.phone}
              type='tel'
              onChange={handleChange('phone')}
              helperText={values.phone === '' && 'Required field'}
              error={values.phone === ''}
              required
						/>
            <TextField
              sx={{ m: 2 }}
              label='Email Address'
              value={values.email}
              type='email'
              onChange={handleChange('email')}
              helperText={values.email === '' && 'Required field'}
              error={values.email === ''}
              required
						/>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ m: 2, width: '50%' }}
              label='Password'
              value={values.password}
              type='password'
              onChange={handleChange('password')}
              helperText={values.password === '' && 'Required field'}
              error={values.password === ''}
              endadornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
									>
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
							}
              required
						/>
            <Select
              sx={{ m: 2 }}
              label='Select A Role'
              defaultValue={values.roleInput}
              onChange={handleChange('roleInput')}
              required
              value={3}
						>
              {dropdown}
            </Select>
          </Box>
        </Box>

        <Divider />

        <Box
          sx={{
            display: 'flex',
            backgroundColor: 'primary.main',
            color: 'background.default',
            my: 3
          }}
				>
          <Button
            sx={{ mx: 2, width: '100%' }}
            color='success'
            size='large'
            variant='contained'
            onClick={register}
					>
						Add Employee
					</Button>
          <Button
            sx={{ mx: 2, width: '100%' }}
            color='secondary'
            size='large'
            variant='contained'
            onClick={closeModals('registerForm')}
					>
						Cancel
					</Button>
        </Box>
      </Paper>
    </Modal>
  )
}
