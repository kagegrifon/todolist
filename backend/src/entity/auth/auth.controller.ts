import type { Request, Response } from 'express'
import { authService } from './auth.service'
import { AuthServiceAbstract, IAuth, IUserLogin, IUserSignUp } from './auth.type'
// import { todoService } from './todo.service'

const mockLogin: IUserLogin = {
    email: 'mock@email.com',
    password: '1234',
}

const mockSignUp: IUserSignUp = { email: 'email', name: 'name', password: 'password' }

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

        this.registrate = this.registrate.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.activate = this.activate.bind(this)
        this.refresh = this.refresh.bind(this)
    }

    async registrate(req: Request, res: Response) {
        try {
            const result = await this.service.registrate(mockSignUp)

            res.send(result)
        } catch (e) {
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
            const result = await this.service.activate(mockAuth.activationLink, mockAuth.userId)

            res.send(result)
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
