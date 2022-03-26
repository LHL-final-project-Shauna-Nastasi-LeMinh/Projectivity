import { createTheme } from '@mui/material/styles';

const colors = {
	type: 'light',
	primary: {
		main: '#3D405B',
		light: '#63667B',
		dark: '#2A2C3F'
	},
	secondary: {
		main: '#E07A5F',
		light: '#E6947F',
		dark: '#9C5542'
	},
	error: {
		main: '#AE2012',
		light: '#BE4C41',
		dark: '#79160C'
	},
	warning: {
		main: '#EE9B00',
		light: '#F1AF33',
		dark: '#A66C00'
	},
	success: {
		main: '#17c3b2',
		light: '#45CFC1',
		dark: '#10887C'
	},
	info: {
		main: '#81B29A',
		light: '#9AC1AE',
		dark: '#5A7C6B'
	},
	background: {
		default: '#FEF9EF'
	},
	divider: '#E07A5F'
};

export const theme = createTheme({
	palette: colors
});

export const dashboardTheme = createTheme({
	palette: colors,
	components: {
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: colors.primary.main
				}
			}
		},
		MuiListItem: {
			root: {
				color: colors.background.default,
				'&:hover': {
					backgroundColor: colors.secondary.main
				},
				'&.Mui-selected': {
					backgroundColor: colors.secondary.main
				}
			},
			styleOverrides: {}
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					color: colors.background.default,
					'&:hover': {
						backgroundColor: colors.secondary.light
					},
					'&.Mui-selected': {
						backgroundColor: colors.secondary.main,
						'&:hover': {
							backgroundColor: colors.secondary.light
						}
					}
				}
			}
		},
		MuiListItemText: {
			styleOverrides: {
				root: {
					color: colors.background.default
				}
			}
		}
	}
});
