import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './globalStyles/muiGlobal'
import { RouterProvider } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { router } from 'Router'

import './globalStyles/App.scss'
import { AppContext, defaultAppContextValue } from 'store'
import { useUserAPI } from 'entity/User'
import { userAuthStore } from 'entity/UserAuth/AuthStore'

export const App: React.FC = () => {
    const [appLoading, setAppLoading] = React.useState(false)
    const appContext = React.useContext(AppContext)
    const userAPI = useUserAPI()

    const loadUser = async () => {
        const token = userAuthStore.getToken()
        let userData = null

        if (token) {
            userData = jwtDecode(token)
        }

        if (userData && 'id' in userData) {
            try {
                setAppLoading(true)
                const user = await userAPI.getById(String(userData['id']))
                appContext.user = { name: user.login, id: user.id }
            } finally {
                setAppLoading(false)
            }
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
