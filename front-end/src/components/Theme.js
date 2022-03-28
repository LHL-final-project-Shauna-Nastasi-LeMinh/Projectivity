import { Block, NoEncryption } from '@mui/icons-material';
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
		default: '#f7ede2',
		paper: '#293241'
	},
	menu: {
		containerBackgroundColor: '#293241'
	},
	divider: 'rgb(249, 65, 68,0.75)',
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
	},
	components: {
		MuiCheckbox: {
			root: {
				color: colors.secondary.light,
				backgroundColor: colors.background.default,
				'&$checked': {
					color: colors.background.default
				},
				colorPrimary: { color: colors.background.default },

				colorSecondary: { color: colors.background.default }
			},
			styleOverrides: {
				root: {
					color: colors.secondary.light,
					backgroundColor: colors.background.default,
					'&$checked': {
						color: colors.background.default
					},
					colorPrimary: { color: colors.background.default },

					colorSecondary: { color: colors.background.default }
				}
			}
		}
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
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					backgroundColor: 'primary.main',
					color: 'background.default'
				}
			}
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: colors.secondary.light,
					backgroundColor: colors.background.default,
					'&$checked': {
						color: colors.background.default
					},
					colorPrimary: { color: colors.background.default },

					colorSecondary: { color: colors.background.default }
				}
			}
		}
	}
});

// export const projectViewTheme = createTheme({
// 	palette: colors,
// 	components: {
// 		MuiSelect: {},
// 		MuiInputBase: {
// 			styleOverrides: {
// 				root: {
// 					'&.MuiInputBase-input': {
// 						borderRadius: 4,
// 						position: 'relative',
// 						backgroundColor: colors.primary.main,
// 						border: '1px solid #ced4da',
// 						fontSize: 16,
// 						padding: '10px 26px 10px 12px',
// 						transition: theme.transitions.create([
// 							'border-color',
// 							'box-shadow'
// 						]),
// 						'&:focus': {
// 							borderRadius: 4,
// 							borderColor: '#80bdff',
// 							boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
// 						}
// 					}
// 				}
// 			}
// 		},
// 		MuiDrawer: {
// 			styleOverrides: {
// 				paper: {
// 					backgroundColor: colors.primary.main
// 				}
// 			}
// 		},
// 		MuiMenu: {
// 			styleOverrides: {
// 				root: {
// 					backgroundColor: 'primary.main',
// 					color: 'background.default'
// 				},
// 				paper: {
// 					backgroundColor: 'primary.main',
// 					color: 'background.default'
// 				},
// 				list: {
// 					backgroundColor: 'primary.main',
// 					color: 'background.default'
// 				}
// 			}
// 		},
// 		MuiListItem: {
// 			styleOverrides: {
// 				root: {
// 					color: colors.background.default,
// 					'&:hover': {
// 						backgroundColor: colors.secondary.main
// 					},
// 					'&.Mui-selected': {
// 						backgroundColor: colors.secondary.main
// 					}
// 				}
// 			}
// 		},
// 		MuiListItemButton: {
// 			styleOverrides: {
// 				root: {
// 					color: colors.primary.main,
// 					'&:hover': {
// 						backgroundColor: colors.secondary.light
// 					},
// 					'&.Mui-selected': {
// 						backgroundColor: colors.secondary.main,
// 						'&:hover': {
// 							backgroundColor: colors.secondary.light
// 						}
// 					}
// 				}
// 			}
// 		},
// 		MuiListItemText: {
// 			styleOverrides: {
// 				root: {
// 					color: colors.background.default
// 				}
// 			}
// 		},
// 		MuiDivider: {
// 			styleOverrides: {
// 				root: {
// 					color: colors.secondary.main
// 				}
// 			}
// 		}
// 	}
// });
