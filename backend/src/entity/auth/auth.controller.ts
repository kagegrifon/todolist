import type { Request, Response } from 'express'
import { authService } from './auth.service'
import { AuthServiceAbstract, IAuth, IUserLogin } from './auth.type'
import { CLIENT_URL } from 'config/env'

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

const mockLogin: IUserLogin = {
    login: 'mock@email.com',
    password: '1234',
}

const mockAuth: IAuth = {
    activationLink: 'somelink',
    id: '1',
    isActivated: false,
    password: '1234',
    userId: '1',
}

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

    async register(req: Request, res: Response) {
        try {
            const { password, login } = req.body

            const userData = await this.service.register({ password, login })

            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * ONE_DAY_IN_MS,
            })
            res.json(userData)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    async login(req: Request, res: Response) {
        try {
            const result = await this.service.login(mockLogin)

            res.send(result)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const result = await this.service.logout(mockAuth.userId)

            res.send(result)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async activate(req: Request, res: Response) {
        try {
            const { link } = req.params
            await this.service.activate(link)

            res.redirect(CLIENT_URL)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async refresh(req: Request, res: Response) {
        try {
            const result = await this.service.refresh(mockAuth.userId)

            res.send(result)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

export const authController = new AuthController(authService)
