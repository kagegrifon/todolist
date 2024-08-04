export type IUser = {
    id: string
    login: string
}

export interface IUserAPIAbstract {
    getById: (userId: IUser['id']) => Promise<IUser>
}
