import * as React from 'react'
// import { RouteHandler } from 'Router'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './globalStyles/muiGlobal'
import { RouterProvider } from 'react-router-dom'
import { router } from 'Router'

import './globalStyles/App.scss'

export const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />

    </ThemeProvider>
)
        // <RouteHandler />