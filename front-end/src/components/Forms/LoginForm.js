import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

export default function LoginForm (props) {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser, setCookie, open, setOpen } = props

  console.log('inside loginform', open)

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const login = event => {
    axios
			.post(process.env.REACT_APP_BACKEND_URL + '/accessControl/login', {
  email: email,
  password: password
})
			.then(res => {
  setUser(res.data)
  setCookie('user', res.data, {
    path: '/'
  })
})
			.catch(function (error) {
  console.log(error.message)
  setMessage('Login invalid')
})
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
          <CardHeader
            title='Login'
            subheader='Please enter your details below'
					/>
          <CardContent>
            <Typography variant='h6' sx={{ color: 'palette.error.main' }}>
              {message}
            </Typography>
            <Input
              id='component-email-error'
              value={email}
              type='email'
              onChange={handleEmailChange}
              aria-describedby='component-email-error-text'
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
						/>
            <FormHelperText id='component-password-error-text'>
							Password
						</FormHelperText>
          </CardContent>
          <CardActions>
            <Button variant='outlined' onClick={login}>
							Login
						</Button>
            <Button variant='outlined' onClick={() => setOpen(false)}>
							Cancel
						</Button>
          </CardActions>
        </FormControl>
      </Card>
    </Modal>
  )
}
