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
import { ExpandMore, MoreVert, Favorite, Share } from '@mui/icons-material';
import Container from '@mui/material/Container';
import HRPage from './HRPage';
import { HR_LEVEL } from './constants/AccessLevel';
import Typography from '@mui/material/Typography';

export default function AboutPage(props) {
	const { user } = props;

	return (
		<Paper
			sx={{
				position: 'absolute',
				left: '0rem',
				display: 'flex',
				width: '100%',
				height: '100%',
				justifyContent: 'center',
				backgroundColor: 'rgb(83, 91, 103, 0.25)'
			}}
		>
			<Card
				elevation={3}
				sx={{
					display: 'flex',
					alignSelf: 'center',
					justifyContent: 'center',
					width: 'fit-content',
					height: 'fit-content',
					backgroundColor: '#f1f1f1'
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
						{'Create your master plan'}
					</Typography>
					<Typography
						variant="h5"
						color="text.secondary"
						align="center"
						sx={{ color: 'primary.main', m: 1 }}
					>
						{
							'Projectivity lets you keep track of your User Stories, and distribute tasks to your team with ease'
						}
					</Typography>
					<Typography
						gutterBottom
						variant="h4"
						component="div"
						align="center"
						sx={{ color: 'secondary.main', m: 2 }}
					>
						{'Track your project'}
					</Typography>
					<Typography
						variant="h5"
						color="text.secondary"
						align="center"
						sx={{ color: 'primary.main', m: 1 }}
					>
						{
							'With Projectivity, keep your team on track with the ease of use and power that Projectivity provides'
						}
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					image={require('../public/images/kanban-board-example.png')}
					alt="Projectivity Example"
					height="fit-content"
				/>
				<CardContent>
					<Typography
						gutterBottom
						variant="h4"
						component="div"
						align="center"
						sx={{ color: 'secondary.main', m: 2 }}
					>
						{'Choose your own workflow'}
					</Typography>
					<Typography
						variant="h5"
						color="text.secondary"
						align="center"
						sx={{ color: 'primary.main', m: 1 }}
					>
						{
							'Your project is unique, and you need to cater your own workflow... Projectivity has you covered!'
						}
					</Typography>
					<Typography
						gutterBottom
						variant="h4"
						component="div"
						align="center"
						sx={{ color: 'secondary.main', m: 2 }}
					>
						{'Customize your project'}
					</Typography>
					<Typography
						variant="h5"
						color="text.secondary"
						align="center"
						sx={{ color: 'primary.main', m: 1 }}
					>
						{
							"No matter what kind of project you're working on, you can fully customize Projectivity to meet the needs of you and your team!"
						}
					</Typography>
				</CardContent>
			</Card>
		</Paper>
	);
}
