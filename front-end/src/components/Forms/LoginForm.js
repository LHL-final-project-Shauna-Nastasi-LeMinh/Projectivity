import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'

export default function LoginForm (props) {
  const { setUser, setCookie, open, setOpen } = props
  const [values, setValues] = React.useState({
    message: '',
    email: '',
    password: '',
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
  setUser(res.data)
  setCookie('user', res.data, {
    path: '/'
  })
})
			.catch(function (error) {
  console.log(error.message)
  setValues({ ...values, [values.message]: 'Login invalid' })
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
						Login
					</Typography>
        </Box>

        <Divider />

        {/* <FormControl
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 2, width: '25ch' },
            backgroundColor: 'background.default'
          }}
				> */}
        <Box sx={{ display: 'flex' }}>
          <TextField
            label='Email Address'
            value={values.email}
            type='email'
            onChange={handleChange('email')}
            helperText=''
            required
					/>
          <TextField
            label='Password'
            value={values.password}
            type='password'
            onChange={handleChange('password')}
            helperText=''
            endAdornment={
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
          <Typography variant='h6' sx={{ color: 'palette.error.main' }}>
            {values.message}
          </Typography>
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
            onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
        </Box>
        {/* </FormControl> */}
      </Paper>
    </Modal>
  )
}
