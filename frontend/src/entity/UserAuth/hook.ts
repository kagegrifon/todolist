import { UserAuthAPI } from './UserAuth'
import { IUserAuthAbstract, IUserLogin } from './type'
import { userAuthStore } from './AuthStore'

// todo make context
const userAuthAPI = new UserAuthAPI()

export const useUserAuthAPI = (): IUserAuthAbstract => {
    const logout = userAuthAPI.logout.bind(userAuthAPI)
    const register = async (newUser: IUserLogin) => {
        const userData = await userAuthAPI.register(newUser)
        userAuthStore.setToken(userData.token.accessToken)

        return userData
    }

    const login = async (newUser: IUserLogin) => {
        const userData = await userAuthAPI.login(newUser)
        userAuthStore.setToken(userData.token.accessToken)

        return userData
    }

    return {
        logout,
        register,
        login,
    }
}
