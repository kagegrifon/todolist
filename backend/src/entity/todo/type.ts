import { TypicalCRUDModelAbstract, TypicalCRUDServiceAbstract } from 'shared/type'

export interface ITodo {
    id: string
    name: string
    isDone?: boolean
}

export type TodoServiceAbstract = TypicalCRUDServiceAbstract<ITodo>

export type TodoModelAbstract = TypicalCRUDModelAbstract<ITodo>
