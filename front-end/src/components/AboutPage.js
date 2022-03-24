import React from 'react';
import Container from '@mui/material/Container';
import HRPage from './HRPage';
import {HR_LEVEL} from './constants/AccessLevel'

export default function AboutPage (props) {
  const {user} = props;
  return (
    <Container>
      {user && user.access_level == HR_LEVEL && <HRPage />}
      {(!user || (user && user.access_level != HR_LEVEL)) && <h2>Welcome to the LHL Final Project!</h2>}
    </Container>
  )
}
