import { Block } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';

const colors = {
	// baseline: #293241
	primary: {
		main: '#293241',
		light: '#535B67',
		dark: '#1C232D'
	},
	secondary: {
		main: '#f94144',
		light: '#FA6769',
		dark: '#AE2D2F'
	},
	error: {
		main: '#f94144'
	},
	warning: {
		main: '#f3722c'
	},
	success: {
		main: '#2A9D8F'
	},
	info: {
		main: '#264653'
	},
	background: {
		default: '#f7ede2'
	},
	divider: '#AE2D2F',
	min: '#264653',
	low: '#2A9D8F',
	medium: '#ffba08',
	high: '#f3722c',
	max: '#f94144'
};

export const theme = createTheme({
	palette: colors,
	typography: {
		fontFamily: 'Roboto, sans-serif'
	}
});

export const logoTheme = createTheme({
	palette: colors,
	typography: {
		fontFamily: 'Sriracha, cursive'
	}
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
			styleOverrides: {
				root: {
					color: colors.background.default,
					'&:hover': {
						backgroundColor: colors.secondary.main
					},
					'&.Mui-selected': {
						backgroundColor: colors.secondary.main
					}
				}
			}
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					color: colors.primary.main,
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
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					color: colors.secondary.main
				}
			}
		}
	}
});

export const projectViewTheme = createTheme({
	palette: colors
	// components: {
	// 	MuiDrawer: {
	// 		styleOverrides: {
	// 			paper: {
	// 				backgroundColor: colors.primary.main
	// 			}
	// 		}
	// 	},
	// 	MuiListItem: {
	// 		styleOverrides: {
	// 			root: {
	// 				color: colors.background.default,
	// 				'&:hover': {
	// 					backgroundColor: colors.secondary.main
	// 				},
	// 				'&.Mui-selected': {
	// 					backgroundColor: colors.secondary.main
	// 				}
	// 			}
	// 		}
	// 	},
	// 	MuiListItemButton: {
	// 		styleOverrides: {
	// 			root: {
	// 				color: colors.background.default,
	// 				'&:hover': {
	// 					backgroundColor: colors.secondary.light
	// 				},
	// 				'&.Mui-selected': {
	// 					backgroundColor: colors.secondary.main,
	// 					'&:hover': {
	// 						backgroundColor: colors.secondary.light
	// 					}
	// 				}
	// 			}
	// 		}
	// 	},
	// 	MuiListItemText: {
	// 		styleOverrides: {
	// 			root: {
	// 				color: colors.background.default
	// 			}
	// 		}
	// 	},
	// 	MuiDivider: {
	// 		styleOverrides: {
	// 			root: {
	// 				color: colors.secondary.main
	// 			}
	// 		}
	// 	}
	// }
});
