import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from 'shared/exceptions'
import { userService, UserService } from './user.service'

class UserController {
    private service: UserService

    constructor(service: UserService) {
        this.service = service

        this.getOne = this.getOne.bind(this)
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params

            const existingUser = await this.service.getById(userId)

            if (!existingUser) {
                throw ApiError.NotFound({ message: `No existing user with such id` })
            }

            res.json(existingUser)
        } catch (e) {
            next(e)
        }
    }
}

export const userController = new UserController(userService)
