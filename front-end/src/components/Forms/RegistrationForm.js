import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl, { useFormControl } from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'

export default function RegistrationForm (props) {
  const { setUser, setCookie, open, setOpen, setMode } = props

  const [roles, setRoles] = useState([])
  const [role, setRole] = useState('')
  const [select, setSelect] = useState('')
  const [values, setValues] = useState({
    firstName: undefined,
    lastName: undefined,
    phone: undefined,
    email: undefined,
    password: undefined,
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
  const roleOptions = result.data.map(role =>
    <MenuItem key={role.name} value={role.name}>
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
      open={open}
      onClose={() => setOpen(false)}
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
            <HowToRegIcon color='secondary' fontSize='large' />
          </Typography>
          <Typography variant='h4' align='center'>
						Sign Up
					</Typography>
        </Box>

        <Divider />

        <FormControl component='form'>
          <Typography variant='h6' sx={{ color: 'error.main' }}>
            {values.message}
          </Typography>
          <Box sx={{ width: '100%', backgroundColor: 'background.default' }}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ m: 2 }}>
                <TextField
                  label='First Name'
                  value={values.firstName}
                  type='text'
                  onChange={handleChange('firstName')}
                  helperText={values.firstName === '' && 'Required field'}
                  error={values.firstName === ''}
                  required
								/>
              </Box>
              <Box sx={{ m: 2 }}>
                <TextField
                  label='Last Name'
                  value={values.lastName}
                  type='text'
                  onChange={handleChange('lastName')}
                  helperText={values.lastName === '' && 'Required field'}
                  error={values.lastName === ''}
                  required
								/>
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ m: 2 }}>
                <TextField
                  label='Phone Number'
                  value={values.phone}
                  type='tel'
                  onChange={handleChange('phone')}
                  helperText={values.phone === '' && 'Required field'}
                  error={values.phone === ''}
                  required
								/>
              </Box>
              <Box sx={{ m: 2 }}>
                <TextField
                  label='Email Address'
                  value={values.email}
                  type='email'
                  onChange={handleChange('email')}
                  helperText={values.email === '' && 'Required field'}
                  error={values.email === ''}
                  required
								/>
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ m: 2, width: '50%' }}>
                <TextField
                  label='Password'
                  value={values.password}
                  type='password'
                  onChange={handleChange('password')}
                  helperText={values.password === '' && 'Required field'}
                  error={values.password === ''}
                  endAdornment={
                    <InputAdornment position='end'>
                    <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
											>
                    {values.showPassword
													? <VisibilityOff />
													: <Visibility />}
                  </IconButton>
                  </InputAdornment>
									}
                  required
								/>
              </Box>
              <Box sx={{ m: 2, width: '50%' }}>
                <TextField
                  label='Select A Role'
                  value={values.roleInput}
                  onChange={handleChange('roleInput')}
                  defaultValue={values.roleInput}
                  helperText={values.roleInput === '' && 'Required field'}
                  error={values.roleInput === ''}
                  sx={{ width: '100%' }}
                  select
                  required
								>
                  {roles}
                </TextField>
              </Box>
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
							Sign Up
						</Button>
            <Button
              sx={{ mx: 2, width: '100%' }}
              color='secondary'
              size='large'
              variant='contained'
              onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
          </Box>
        </FormControl>
      </Paper>
    </Modal>
  )
}
