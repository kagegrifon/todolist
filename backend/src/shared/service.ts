import { TypicalCRUDModelAbstract, TypicalCRUDServiceAbstract, WithId } from './type'

export class TypicalCRUDService<Entity extends WithId>
    implements TypicalCRUDServiceAbstract<Entity>
{
    constructor(public model: TypicalCRUDModelAbstract<Entity>) {
        this.create = this.create.bind(this)
        this.getById = this.getById.bind(this)
        this.getAll = this.getAll.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    async create(newTodo: Omit<Entity, 'id'>) {
        const result = await this.model.create(newTodo)

        return result
    }

    async getById(id: string) {
        const result = await this.model.getById(id)

        return result
    }

    async getAll() {
        const result = await this.model.getAll()

        return result
    }

    async update(id: string, updatingTodo: Partial<Entity>) {
        const result = await this.model.update(id, updatingTodo)

        return result
    }

    async delete(id: string) {
        const result = await this.model.delete(id)

        return result
    }
}
