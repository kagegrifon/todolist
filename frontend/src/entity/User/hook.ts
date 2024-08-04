import * as React from 'react'
import { UserAPI } from './UserAPI'
import { IUserAPIAbstract } from './type'

// todo make context
const userAPI = new UserAPI()

export const useUserAPI = (): IUserAPIAbstract => {
    return React.useMemo(() => userAPI, [])
}
