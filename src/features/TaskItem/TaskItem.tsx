import * as React from "react"
import type { ITask } from 'entity/Task'

export interface ITaskItem {
    task: ITask
    onChange: (modifiedTask: Partial<ITask>) => void
}

export const TaskItem: React.FC<ITaskItem> = ({ task, onChange }) => {
    const onDoneChange = React.useCallback(() => {
        onChange({ isDone: !task.isDone })
    }, [task.isDone])

    return <div>
        <input type="checkbox" onChange={onDoneChange} checked={task.isDone} />
        <p>{task.name}</p>
        <p >icon pen</p>
        <p >icon basket</p>
    </div>
}
