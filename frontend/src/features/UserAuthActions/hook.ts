import { userAuthAPI } from 'entity/UserAuth/UserAuth'
import { IUserAuthAbstract, IUserLogin } from 'entity/UserAuth/type'
import { userAuthStore } from 'entity/UserAuth/AuthStore'
import { IUser } from 'entity/User/type'
import * as React from 'react'
import { AppContext } from 'store'

export const useUserAuthAPI = (): IUserAuthAbstract => {
    const appContext = React.useContext(AppContext)

    const logout = async (userId: IUser['id']) => {
        await userAuthAPI.logout(userId)
        userAuthStore.setToken('')

        appContext.user = undefined
    }

    const register = async (newUser: IUserLogin) => {
        const userData = await userAuthAPI.register(newUser)
        userAuthStore.setToken(userData.token.accessToken)
        appContext.user = { name: userData.user.login, id: userData.user.id }

        return userData
    }

    const login = async (newUser: IUserLogin) => {
        const userData = await userAuthAPI.login(newUser)
        userAuthStore.setToken(userData.token.accessToken)
        appContext.user = { name: userData.user.login, id: userData.user.id }

        return userData
    }

    return {
        logout,
        register,
        login,
    }
}
