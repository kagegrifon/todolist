import { ITask } from 'entity/Task'
import { useTaskCRUD } from 'entity/Task/hook'
import { ITaskItem } from 'features/TaskItem'
import * as React from 'react'

export const useTodoList = () => {
    const TaskService = useTaskCRUD()
    const [tasks, setTasks] = React.useState<ITask[]>([])

    const getAllTasks = React.useCallback(() => {
        TaskService.getAll().then((tasks) => {
            setTasks(tasks)
        })
    }, [setTasks])

    React.useEffect(() => {
        getAllTasks()
    }, [])

    const onChange: ITaskItem['onChange'] = React.useCallback(async (taskId, modifiedTask) => {
        TaskService.update(taskId, modifiedTask).then((updatedTask) => {
            const oldTaskIndex = tasks.findIndex(t => t.id === updatedTask.id)

            if (oldTaskIndex !== -1) {
                const tasksCopy = tasks.slice()
                tasksCopy.splice(oldTaskIndex, 1, updatedTask)
                setTasks(tasksCopy)
            } else {
                throw Error(`There is no such task with id ${updatedTask.id}. Try to refresh page`)
            }
        })
    }, [])

    const onDelete: ITaskItem['onDelete'] = React.useCallback((taskId) => {
        TaskService.delete(taskId).then(() => {
            setTasks(tasks.filter(t => t.id === taskId))
        })
    }, [])

    const onAddNewTask = React.useCallback((newTaskData: Pick<ITask, 'name'>) => {
        TaskService.add(newTaskData).then(newTask => {
            setTasks([...tasks, newTask])
        })
    }, [])

    const addNewTaskModal = useAddNewTaskModal()

    return {
        taskListProps: {
            tasks,
            onChange,
            onDelete,
        },
        addNewTaskModal,
        onAddNewTask,
    }
}

function useAddNewTaskModal() {
    const [isAddNewTaskOpen, setIsAddNewTaskOpen] = React.useState(false)

    const openAddNewTaskModal = React.useCallback(() => {
        setIsAddNewTaskOpen(true)
    }, [isAddNewTaskOpen])

    const closeAddNewTaskModal = React.useCallback(() => {
        setIsAddNewTaskOpen(false)
    }, [isAddNewTaskOpen])

    return {
        isOpen: isAddNewTaskOpen,
        open: openAddNewTaskModal,
        close: closeAddNewTaskModal,
    }
}
