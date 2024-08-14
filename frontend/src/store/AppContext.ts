import { IUser } from 'entity/User/type'
import * as React from 'react'

export type IAppContext = {
    user?: IUser
    setUser: React.Dispatch<React.SetStateAction<IUser>>
}

const defaultAppContextValue = {} as IAppContext

export const AppContext = React.createContext<IAppContext>(defaultAppContextValue)
