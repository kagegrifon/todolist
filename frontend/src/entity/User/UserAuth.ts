import { API } from 'shared/api'
import { IUser, IUserAuthAbstract, IUserLogin } from './type'

export const authUrl = '/auth'

export class UserAuth implements IUserAuthAbstract {
    public async register(newUser: IUserLogin) {
        try {
            const request = await API.request<IUser>({
                url: `${authUrl}/register`,
                method: 'post',
                data: newUser,
            })

            return request.data
        } catch (e) {
            // alert('Something happen while adding new task, check internet connection')
            console.log(e)
        }
    }

    public async login(user: IUserLogin) {
        try {
            const request = await API.request<IUser>({
                url: `${authUrl}/login`,
                method: 'post',
                data: user,
            })

            return request.data
        } catch (e) {
            // alert('Something happen while adding new task, check internet connection')
            console.log(e)
        }
    }

    public async logout(userId: IUser['id']) {
        try {
            await API.request<IUser>({
                url: `${authUrl}/logout`,
                method: 'post',
                data: userId,
            })
        } catch (e) {
            // alert('Something happen while adding new task, check internet connection')
            console.log(e)
        }
    }
}
