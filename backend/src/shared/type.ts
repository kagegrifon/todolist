export interface WithId {
    id: string
}

export interface TypicalCRUDModelAbstract<Entity extends WithId> {
    create(newEntity: Omit<Entity, 'id'>): Promise<Entity>
    getById(id: Entity['id']): Promise<Entity | undefined>
    getAll(): Promise<Entity[]>
    update(id: Entity['id'], updatingEntity: Partial<Entity>): Promise<Entity>
    delete(id: Entity['id']): Promise<Entity>
}

export interface TypicalCRUDServiceAbstract<Entity extends WithId> {
    create(newEntity: Omit<Entity, 'id'>): Promise<Entity>
    getById(id: Entity['id']): Promise<Entity | undefined>
    getAll(): Promise<Entity[]>
    update(id: Entity['id'], updatingEntity: Partial<Entity>): Promise<Entity>
    delete(id: Entity['id']): Promise<Entity>
}
