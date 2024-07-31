import * as React from 'react'
import { UserAuth } from './UserAuth'
import { IUserAuthAbstract } from './type'

// todo make context
const userAuthAPI = new UserAuth()

export const useUserAuthAPI = (): IUserAuthAbstract => {
    return React.useMemo(() => userAuthAPI, [])
}
