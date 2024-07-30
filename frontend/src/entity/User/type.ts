export type IUserLogin = {
    login: string
    password: string
}

export type IUser = {
    id: string
    login: string
}

export interface IUserAuthAbstract {
    register: (newUser: IUserLogin) => Promise<IUser>
    login: (user: IUserLogin) => Promise<IUser>
    logout: (userId: IUser['id']) => Promise<void>
}
