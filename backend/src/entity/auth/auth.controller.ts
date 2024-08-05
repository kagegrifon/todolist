import type { NextFunction, Request, Response } from 'express'
import { authService } from './auth.service'
import { AuthServiceAbstract } from './auth.type'
import { CLIENT_URL } from 'config/env'
import { validationResult } from 'express-validator'
import { ApiError } from 'shared/exceptions'

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

class AuthController {
    service: AuthServiceAbstract

    constructor(service: AuthServiceAbstract) {
        this.service = service

        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.activate = this.activate.bind(this)
        this.refresh = this.refresh.bind(this)
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest({ message: 'Validation error', error: errors.array() }),
                )
            }

            const { password, login } = req.body

            const userData = await this.service.register({ password, login })

            res.cookie('refreshToken', userData.token.refreshToken, {
                httpOnly: true,
                maxAge: 30 * ONE_DAY_IN_MS,
            })
            res.json(userData)
        } catch (e) {
            res.clearCookie('refreshToken', { httpOnly: true })
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest({ message: 'Validation error', error: errors }))
            }

            const { password, login } = req.body
            const userData = await this.service.login({ password, login })

            res.cookie('refreshToken', userData.token.refreshToken, {
                httpOnly: true,
                maxAge: 30 * ONE_DAY_IN_MS,
            })
            res.json(userData)
        } catch (e) {
            res.clearCookie('refreshToken', { httpOnly: true })
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest({ message: 'Validation error', error: errors }))
            }

            const { userId } = req.body
            await this.service.logout(userId)
            res.clearCookie('refreshToken', { httpOnly: true })
            res.status(200).end()
        } catch (e) {
            next(e)
        }
    }

    // TODO: add with mailing
    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const { link } = req.params
            await this.service.activate(link)

            res.redirect(CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    // TODO: add with token logic
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            if (typeof refreshToken !== 'string' && !refreshToken) {
                throw ApiError.UnauthorizedError()
            }

            const userData = await this.service.refresh(refreshToken)

            res.cookie('refreshToken', userData.token.refreshToken, {
                httpOnly: true,
                maxAge: 30 * ONE_DAY_IN_MS,
            })

            res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

export const authController = new AuthController(authService)
