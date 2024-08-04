export type IUserLogin = {
    login: string
    password: string
}

export type IUser = {
    id: number
    login: string
}

export type ISuccessAuthDTO = {
    user: IUser
    token: {
        accessToken: string
    }
}

export interface IUserAuthAbstract {
    register: (newUser: IUserLogin) => Promise<ISuccessAuthDTO>
    login: (user: IUserLogin) => Promise<ISuccessAuthDTO>
    logout: (userId: IUser['id']) => Promise<void>
}
