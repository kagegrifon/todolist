import { TaskList } from "features/TaskList/TaskList"
import * as React from "react"
import { Title } from "shared/Title"
import { useTodoList } from "./TodoListLogic"

export const TodoList: React.FC = () => {
    const { taskListProps, onAddNewTaskClick } = useTodoList()

    return <div>
        <Title>New TodoList</Title><button onClick={onAddNewTaskClick}>add new task</button><TaskList {...taskListProps} />
    </div>
} 