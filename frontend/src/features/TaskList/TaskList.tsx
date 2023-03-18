import * as React from 'react'
import { TaskItem, ITaskItem } from 'features/TaskItem'
import { ITask } from 'entity/Task'
import List from '@mui/material/List'
import { styled } from 'shared/globalDeps'

const StyledTaskItem = styled(TaskItem)`
    width: 300px;

    & + & {
        :before {
            content: '';
            display: block;
            width: calc(100% - 15px);
            height: 1px;
            background-color: gray;
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }
`

export interface ITaskList {
    tasks: ITask[]
    onChange: ITaskItem['onChange']
    onDelete: ITaskItem['onDelete']
}

export const TaskList: React.FC<ITaskList> = ({ tasks, onChange, onDelete }) => {
    return (
        <List>
            {tasks.map((task) => {
                const taskItemProps: ITaskItem = {
                    task,
                    onChange,
                    onDelete,
                }
                return <StyledTaskItem key={task.id} {...taskItemProps} />
            })}
        </List>
    )
}
