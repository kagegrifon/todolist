import { TaskList } from "features/TaskList/TaskList"
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
    return <div><Title>New TodoList</Title><TaskList tasks={taskDataList} /> </div>
} 