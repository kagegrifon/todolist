import * as React from "react"
import { TaskItem, ITaskItem } from 'features/TaskItem'
import { ITask } from "entity/Task"

export interface ITaskList {
    tasks: ITask[]
}

export const TaskList: React.FC<ITaskList> = ({ tasks }) => {
    const onChange: ITaskItem['onChange'] = React.useCallback((modifiedTask) => {
        console.log({ modifiedTask })
    }, [])

    return <ul>
        {tasks.map((task, i) =>
            <li key={task.name + i}><TaskItem task={task} onChange={onChange} /></li>
        )}

    </ul>
}
