import { TaskList } from "features/TaskList/TaskList"
import { Title } from "shared/Title"

const taskDataList = [
    {
        name: 'one',
        isDone: false,
    },
    {
        name: 'two',
        isDone: false,
    },
    {
        name: 'three',
        isDone: true,
    },
]

export const TodoList:React.FC = () => {
    return <div><Title>New TodoList</Title><TaskList tasks={taskDataList} /> </div>
} 