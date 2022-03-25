import React, { useState } from 'react'
import axios from 'axios'
import {
	Button,
	Modal,
	Typography,
	Box,
	TextField,
	InputAdornment,
	IconButton,
	Divider,
	Paper
} from '@mui/material'
import { HowToReg, Visibility, VisibilityOff } from '@mui/icons-material'

export default function LoginForm (props) {
  const { setViewMode, setUser, setCookie, modals, closeModals } = props
  const [values, setValues] = useState({
    message: '',
    email: null,
    password: null,
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

  const login = event => {
    axios
			.post(process.env.REACT_APP_BACKEND_URL + '/accessControl/login', {
  email: values.email,
  password: values.password
})
			.then(res => {
  closeModals('loginForm')
  setUser(res.data)
  setCookie('user', res.data, {
    path: '/'
  })
  setViewMode(true)
})
			.catch(function (error) {
  console.log(error.message)
  setValues({ ...values, message: 'Form invalid' })
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

  console.log(modals.loginForm)
  return (
    <Modal
      open={modals.loginForm}
      onClose={() => closeModals('loginForm')}
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
						Login
					</Typography>
        </Box>

        <Divider />

        <Box sx={{ width: '100%', backgroundColor: 'background.default' }}>
          <Box sx={{ display: 'flex' }}>
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
            <TextField
              sx={{ m: 2 }}
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
            onClick={login}
					>
						Login
					</Button>
          <Button
            sx={{ mx: 2, width: '100%' }}
            color='secondary'
            size='large'
            variant='contained'
            onClick={() => closeModals('loginForm')}
					>
						Cancel
					</Button>
        </Box>
      </Paper>
    </Modal>
  )
}
