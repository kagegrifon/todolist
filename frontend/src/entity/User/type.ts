export type IUserLogin = {
    name: string
    password: string
}

export type IUser = {
    id: string
    name: string
}

export interface IUserAuthAbstract {
    register: (newUser: IUserLogin) => Promise<IUser>
    login: (user: IUserLogin) => Promise<IUser>
    logout: (userId: IUser['id']) => Promise<void>
}
