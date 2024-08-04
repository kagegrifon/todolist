import { ITaskServiceAbstact } from 'entity/Task'
import { TaskService } from 'entity/Task/service'
import { IUserAPIAbstract } from 'entity/User/type'
import { IUserAuthAbstract } from 'entity/UserAuth/type'
import * as React from 'react'

export type IAppContext = {
    user?: {
        name: string
        id: string
    }
}

export const defaultAppContextValue: IAppContext = {}

export const AppContext = React.createContext<IAppContext>(defaultAppContextValue)
