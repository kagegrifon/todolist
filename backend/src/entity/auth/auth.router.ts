import { Router } from 'express'
import { authController } from './auth.controller'
import { body } from 'express-validator'

export const authRouter = Router()

authRouter.post(
    '/register',
    body('password').isString().isLength({ min: 3, max: 32 }),
    body('login').isString().isLength({ min: 3, max: 25 }),
    authController.register,
)

authRouter.post(
    '/login',
    body('password').isString().isLength({ min: 3, max: 32 }),
    body('login').isString().isLength({ min: 3, max: 25 }),
    authController.login,
)

authRouter.post('/logout', body('userId').isString(), authController.logout)

authRouter.get('/activate/:link', authController.activate)

authRouter.get('/refresh', authController.refresh)
