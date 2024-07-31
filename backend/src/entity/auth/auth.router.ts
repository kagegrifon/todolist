import { Router } from 'express'
import { authController } from './auth.controller'

export const authRouter = Router()

authRouter.post('/register', authController.register)

authRouter.post('/login', authController.login)

authRouter.post('/logout', authController.logout)

authRouter.get('/activate/:link', authController.activate)

authRouter.get('/refresh', authController.refresh)
