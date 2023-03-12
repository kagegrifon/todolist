import { ITask } from "entity/Task"
import { useTaskCRUD } from "entity/Task/hook"
import { ITaskItem } from "features/TaskItem"
import * as React from "react"

export const useTodoList = () => {
    const TaskCRUD = useTaskCRUD()
    const [tasks, setTasks] = React.useState(TaskCRUD.getAll())

    const onChange: ITaskItem['onChange'] = React.useCallback((taskId, modifiedTask) => {
        TaskCRUD.update(taskId, modifiedTask)
        setTasks([...TaskCRUD.getAll()])
    }, [])

    const onDelete: ITaskItem['onDelete'] = React.useCallback((taskId) => {
        TaskCRUD.delete(taskId)
        setTasks([...TaskCRUD.getAll()])
    }, [])

    const onEdit: ITaskItem['onEdit'] = React.useCallback((taskId) => {
        const task = TaskCRUD.getById(taskId)
        if (!task) {
            throw Error(`no such task with id, ${taskId}`)
        }

        const newTaskName = prompt('Edit task name', task.name)
        if (newTaskName) {
            TaskCRUD.update(taskId, { name: newTaskName })
        }

        setTasks([...TaskCRUD.getAll()])
    }, [])

    const onAddNewTask = React.useCallback((newTaskData: Pick<ITask, 'name'>) => {
        TaskCRUD.add(newTaskData)

        setTasks([...TaskCRUD.getAll()])
    }, [])

    const addNewTaskModal = useAddNewTaskModal()

    return {
        taskListProps: {
            tasks,
            onChange,
            onDelete,
            onEdit
        },
        addNewTaskModal,
        onAddNewTask
    }
}

function useAddNewTaskModal() {
    const [isAddNewTaskOpen, setIsAddNewTaskOpen] = React.useState(false)

    const openAddNewTaskModal = React.useCallback(() => {
        setIsAddNewTaskOpen(true)
    }, [isAddNewTaskOpen])

    const closeAddNewTaskModal= React.useCallback(() => { setIsAddNewTaskOpen(false); }, [isAddNewTaskOpen])

    return {
        isOpen: isAddNewTaskOpen,
        open: openAddNewTaskModal,
        close: closeAddNewTaskModal
    }
}