import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../shared/exceptions'
import { tokenService } from 'entity/token/token.service'

export const authMiddleware = function (req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            next(ApiError.UnauthorizedError())
        }
        const accessToken = authorizationHeader.split(' ')[1]

        if (!accessToken) {
            next(ApiError.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)

        if (!userData) {
            next(ApiError.UnauthorizedError())
        }

        req['user'] = userData
        next()
    } catch (e) {
        next(ApiError.UnauthorizedError())
    }
}
