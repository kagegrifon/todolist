export type IUser = {
    id: number
    login: string
}

export interface IUserAPIAbstract {
    getById: (userId: IUser['id']) => Promise<IUser>
}
