import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        success: {
          main: '#5b870da3',
        },
    },
    typography: {
        // eslint-disable-next-line quotes
        fontFamily: "'IndieFlower-Regular', 'PT Sans', Arial, sans-serif",
        allVariants: {
            letterSpacing: '1px'
        },
        body1: {
            fontSize: '20px'
        } 
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '20px'
                }
            }
        },
        
    }
  });
