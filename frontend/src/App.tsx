import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './globalStyles/muiGlobal'
import { RouterProvider } from 'react-router-dom'
import { router } from 'Router'

import './globalStyles/App.scss'
import { AppContext, defaultAppContextValue } from 'store'
import { useUserAPI } from 'entity/User'

export const App: React.FC = () => {
    const [appLoading, setAppLoading] = React.useState(true)
    const userAPI = useUserAPI()

    const loadUser = async () => {
        try {
            setAppLoading(true)
            await userAPI.getById('1')
        } finally {
            setAppLoading(false)
        }
    }

    React.useEffect(() => {
        loadUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (appLoading) {
        return <div>Loading</div>
    }

    return (
        <AppContext.Provider value={defaultAppContextValue}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </AppContext.Provider>
    )
}
