export interface IUser {
    id: number
    email: string
    name: boolean
}

export interface IUserSignUp {
    email: string
    name: string
    password: string
}

export interface IUserLogin {
    email: string
    password: string
}

export interface AuthServiceAbstract {
    registrate(data: IUserSignUp): Promise<undefined>
    login(data: IUserLogin): Promise<undefined>
    logout(): Promise<undefined>
    activate(link: string, userId: IUser['id']): Promise<undefined>
    // TODO exclude from separate entity
    refresh(): Promise<undefined>
}
