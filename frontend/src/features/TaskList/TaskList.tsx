import * as React from "react"
import { TaskItem, ITaskItem } from 'features/TaskItem'
import { ITask } from "entity/Task"
import List from '@mui/material/List';
import { styled } from "shared/globalDeps";

const StyledTaskItem = styled(TaskItem)`
    min-width: 200px;
`

export interface ITaskList {
    tasks: ITask[]
    onChange: ITaskItem['onChange']
    onDelete: ITaskItem['onDelete']
}

export const TaskList: React.FC<ITaskList> = ({ tasks, onChange, onDelete, }) => {
    return <List>
        {tasks.map((task) => {
            const taskItemProps: ITaskItem = {
                task, onChange, onDelete,
            }
            return <StyledTaskItem key={task.id} {...taskItemProps} />
        })}

    </List>
}
