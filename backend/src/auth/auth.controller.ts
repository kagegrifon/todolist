import type { Request, Response } from 'express'
import { AuthServiceAbstract } from './type'
// import { todoService } from './todo.service'

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
            const mock = { email: 'email', name: 'name', password: 'password' }
            const result = await this.service.registrate(mock)

            res.send(result)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async login(req: Request, res: Response) {
        try {
            const result = await this.service.login({ email: 'afdasf', password: 'asfdsaf' })

            res.send(result)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const result = await this.service.logout()

            res.send(result)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async activate(req: Request, res: Response) {
        try {
            const [link, userId] = ['asfas', 1]
            const result = await this.service.activate(link, userId)

            res.send(result)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async refresh(req: Request, res: Response) {
        try {
            const result = await this.service.refresh()

            res.send(result)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}
// todo fix
export const authController = new AuthController({} as AuthServiceAbstract)
