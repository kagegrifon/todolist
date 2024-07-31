import type { Request, Response } from 'express'
import { TodoServiceAbstract } from './type'
import { todoService } from './todo.service'

class TodoController {
    service: TodoServiceAbstract

    constructor(service: TodoServiceAbstract) {
        this.service = service

        this.create = this.create.bind(this)
        this.getById = this.getById.bind(this)
        this.getAll = this.getAll.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    async create(req: Request, res: Response) {
        try {
            const todoDTO = req.body

            const result = await this.service.create(todoDTO)

            res.send(result)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const result = await this.service.getById(id)

            res.send(result)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const result = await this.service.getAll()

            res.send(result)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const todoDTO = req.body

            const result = await this.service.update(id, todoDTO)

            res.send(result)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const result = await this.service.delete(id)

            res.send(result)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

export const todoController = new TodoController(todoService)
