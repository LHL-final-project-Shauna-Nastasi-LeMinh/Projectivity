import React from 'react';
import {
	Box,
	Paper,
	Card,
	CardHeader,
	CardMedia,
	Avatar,
	IconButton,
	CardContent,
	CardActions,
	Button
} from '@mui/material';
import {
	ExpandMore,
	MoreVert,
	Favorite,
	Share,
	Logout
} from '@mui/icons-material';
import Container from '@mui/material/Container';
import { HR_LEVEL } from './constants/AccessLevel';
import Typography from '@mui/material/Typography';

export default function HRPage(props) {
	const { openModals, logout } = props;

	return (
		<Paper
			sx={{
				position: 'absolute',
				left: '0rem',
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				height: '100%',
				justifyContent: 'center',
				alignContent: 'center',
				backgroundColor: 'rgb(83, 91, 103, 0.25)'
			}}
		>
			<Card
				elevation={3}
				sx={{
					alignSelf: 'center',
					justifyContent: 'center',
					width: '100%',
					height: 'fit-content',
					backgroundColor: 'rgb(247, 237, 226, 1)'
				}}
			>
				<CardContent>
					<Typography
						gutterBottom
						variant="h4"
						component="div"
						align="center"
						sx={{ color: 'secondary.main', m: 2 }}
					>
						{'Welcome HR Admin!'}
					</Typography>
					<Typography
						variant="h5"
						color="text.secondary"
						align="center"
						sx={{ color: 'primary.main', m: 1 }}
					>
						{
							'From this landing page you can Add Employees for your Project Manager to assign!'
						}
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						alignSelf: 'center',
						justifyContent: 'center',
						width: '100%',
						height: 'fit-content',
						backgroundColor: 'rgb(247, 237, 226, 1)'
					}}
				>
					<Button
						disableRipple
						size="large"
						sx={{
							color: 'primary.main',
							'&:hover': { color: 'secondary.light' }
						}}
						onClick={() => openModals('registerForm')}
					>
						Add Employee
					</Button>
					<Button
						disableRipple
						size="large"
						sx={{
							color: 'primary.main',
							'&:hover': { color: 'secondary.light' }
						}}
						onClick={() => logout()}
					>
						Logout
					</Button>
				</CardActions>
			</Card>
		</Paper>
	);
}
