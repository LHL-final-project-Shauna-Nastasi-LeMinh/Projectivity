import { useState } from 'react';
import Bin from './Bin';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { theme } from './Theme';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Box
} from '@mui/material';

export default function BinDrawer(props) {
	const { deleteTicketByDragDrop } = props;
	const [drawerDialogOpen, setDrawerDialogOpen] = useState(false);
	const [openConfirmed, setOpenConfirmed] = useState(false);

	return (
		<Accordion
			expanded={openConfirmed}
			onChange={() => {
				if (openConfirmed) {
					setOpenConfirmed(false);
				} else {
					setDrawerDialogOpen(true);
				}
			}}
			sx={{
				backgroundColor: 'primary.default',
				'&:hover': { backgroundColor: 'secondary.light' }
			}}
			disableGutters
		>
			<AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
				{!openConfirmed ? (
					<ArrowRight
						sx={{ color: 'background.default', transform: 'rotate(90deg)' }}
					/>
				) : (
					<ArrowLeft
						sx={{ color: 'background.default', transform: 'rotate(90deg)' }}
					/>
				)}
				<Typography
					fontSize="large"
					sx={{ color: 'background.default', mx: 1 }}
				>
					{!openConfirmed ? 'Open Recycle Bin' : 'Close Recycle Bin'}
				</Typography>
			</AccordionSummary>
			{openConfirmed && (
				<AccordionDetails
					sx={{
						position: 'absolute',
						top: '3rem',
						backgroundColor: 'primary.main',
						width: '18rem',
						height: '9rem',
						borderRadius: 2
					}}
				>
					<Bin />
				</AccordionDetails>
			)}
			{!openConfirmed && (
				<Dialog
					open={drawerDialogOpen}
					onClose={() => setDrawerDialogOpen(false)}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle
						id="alert-dialog-title"
						sx={{ color: 'background.default' }}
					>
						Open the Recycle Bin?
					</DialogTitle>
					<Box
						sx={{
							display: 'flex',
							alignContent: 'center',
							backgroundColor: 'secondary.light'
						}}
					>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								<Typography
									fontSize="medium"
									sx={{ alignSelf: 'center', color: 'background.default' }}
								>
									WARNING: Opening the Recycle Bin drawer will allow you drag
									tickets into it to delete them in bulk. Are you sure you want
									to open the Recycle Bin drawer?
								</Typography>
							</DialogContentText>
						</DialogContent>
					</Box>
					<DialogActions>
						<Button
							onClick={() => {
								setOpenConfirmed(true);
								setDrawerDialogOpen(false);
							}}
							sx={{
								color: 'background.default',
								'&:hover': { color: 'secondary.light' }
							}}
						>
							Open
						</Button>
						<Button
							onClick={() => setDrawerDialogOpen(false)}
							sx={{
								color: 'background.default',
								'&:hover': { color: 'secondary.light' }
							}}
						>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Accordion>
	);
}
