import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3D405B'
    },
    secondary: {
      main: '#E07A5F'
    },
    error: {
      main: '#AE2012'
    },
    warning: {
      main: '#EE9B00'
    },
    success: {
      main: '#17c3b2'
    },
    info: {
      main: '#81B29A'
    },
    background: {
      default: '#FEF9EF'
    },
    divider: '#E07A5F'
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#3D405B',
          color: '#FEF9EF',
          '&:hover': {
            backgroundColor: '#AAAAAA',
            color: '#123109'
          },
          '&:selected': {
            backgroundColor: '#123109',
            color: '#AAAAAA'
          }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          width: '100%',
          backgroundColor: '#3D405B',
          color: '#FEF9EF'
        },
        '&:hover': {
          backgroundColor: '#AAAAAA',
          color: '#123109'
        }
      }
    }
  }
})
