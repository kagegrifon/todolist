import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './globalStyles/muiGlobal'
import { RouterProvider } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { router } from 'Router'

import './globalStyles/App.scss'
import { AppContext } from 'store'
import { useUserAPI } from 'entity/User'
import { userAuthStore } from 'entity/UserAuth/AuthStore'
import { IUser } from 'entity/User/type'

export const App: React.FC = () => {
    const [appLoading, setAppLoading] = React.useState(false)
    const [user, setUser] = React.useState<IUser | undefined>()
    const userAPI = useUserAPI()

    const loadUser = async () => {
        const token = userAuthStore.getToken()
        let userData = null

        if (token) {
            userData = jwtDecode(token)
        }

        console.log('before loadUser', { userData })

        if (userData && 'id' in userData) {
            try {
                setAppLoading(true)
                console.log('loadUser', { userData })

                const user = await userAPI.getById(Number(userData.id))
                setUser(user)
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
        <AppContext.Provider value={{ user, setUser }}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </AppContext.Provider>
    )
}
