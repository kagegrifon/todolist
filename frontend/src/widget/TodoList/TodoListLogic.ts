import { ITask } from 'entity/Task'
import { useTaskCRUD } from 'entity/Task/hook'
import { ITaskItem } from 'features/TaskItem'
import * as React from 'react'

export const useTodoList = () => {
    const TaskService = useTaskCRUD()
    const [tasks, setTasks] = React.useState<ITask[]>([])

    const getAllTasks = React.useCallback(() => {
        TaskService.getAll().then((tasks) => {
            setTasks([...tasks])
        })
    }, [TaskService])

    React.useEffect(() => {
        getAllTasks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChange: ITaskItem['onChange'] = React.useCallback(
        async (taskId, modifiedTask) => {
            TaskService.update(taskId, modifiedTask).then((updatedTask) => {
                const oldTaskIndex = tasks.findIndex((t) => t.id === updatedTask.id)

                if (oldTaskIndex !== -1) {
                    const tasksCopy = tasks.slice()
                    tasksCopy.splice(oldTaskIndex, 1, updatedTask)
                    setTasks(tasksCopy)
                } else {
                    throw Error(
                        `There is no such task with id ${updatedTask.id}. Try to refresh page`,
                    )
                }
            })
        },
        [TaskService, tasks],
    )

    const onDelete: ITaskItem['onDelete'] = React.useCallback(
        (taskId) => {
            TaskService.delete(taskId).then(() => {
                setTasks(tasks.filter((t) => t.id !== taskId))
            })
        },
        [TaskService, tasks],
    )

    const onAddNewTask = React.useCallback(
        (newTaskData: Pick<ITask, 'name'>) => {
            TaskService.add(newTaskData).then((newTask) => {
                setTasks((prevTasks) => {
                    return [...prevTasks, newTask]
                })
            })
        },
        [TaskService],
    )

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
    }, [])

    const closeAddNewTaskModal = React.useCallback(() => {
        setIsAddNewTaskOpen(false)
    }, [])

    return {
        isOpen: isAddNewTaskOpen,
        open: openAddNewTaskModal,
        close: closeAddNewTaskModal,
    }
}
