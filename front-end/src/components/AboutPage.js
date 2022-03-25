import React from 'react'
import Container from '@mui/material/Container'
import HRPage from './HRPage'
import { HR_LEVEL } from './constants/AccessLevel'
import Typography from '@mui/material/Typography'

export default function AboutPage (props) {
  const { user } = props
  return (
    <Container>
      <Typography variant='h4' align='center'>
				Welcome to the LHL Final Project!
			</Typography>
    </Container>
  )
}

// {user !== null && user.access_level == HR_LEVEL && <HRPage />}
{
	/* {(user === null || (user && user.access_level != HR_LEVEL)) &&
      <h2>Welcome to the LHL Final Project!</h2>} */
}
