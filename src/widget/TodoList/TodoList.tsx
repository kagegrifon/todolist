import { TaskList } from "features/TaskList/TaskList"
import * as React from "react"
import { Title } from "shared/Title"

const taskDataList = [
    {
        id: 1,
        name: 'one',
        isDone: false,
    },
    {
        id: 2,
        name: 'two',
        isDone: false,
    },
    {
        id: 3,
        name: 'three',
        isDone: true,
    },
]

export const TodoList: React.FC = () => {
    const onAddNewTaskClick = React.useCallback(() => {
        const taskName = prompt('New task name')
        console.log({taskName})
    }, [])

    return <div><Title>New TodoList</Title><button onClick={onAddNewTaskClick}>add new task</button><TaskList tasks={taskDataList} /> </div>
} 