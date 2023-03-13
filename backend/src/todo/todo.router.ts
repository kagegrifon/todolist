import { Router } from 'express'
import { todoController } from './todo.controller'

export const todoRouter = Router()

todoRouter.post('/', todoController.create)

todoRouter.get('/', todoController.getAll)

todoRouter.get('/:id', todoController.getById)

todoRouter.put('/:id', todoController.update)

todoRouter.delete('/:id', todoController.delete)
