import { TaskList } from 'features/TaskList'
import * as React from 'react'
import { Title } from 'shared/Title'
import { useTodoList } from './TodoListLogic'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { AddTaskModal } from 'features/AddTaskModal';
import { styled } from 'shared/globalDeps';

const AddButton = styled(Button)`
    text-transform: none;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const TodoList: React.FC = () => {
    const { taskListProps, onAddNewTask, addNewTaskModal } = useTodoList()

    return <Container><div>
        <Title>TodoList</Title>
        <AddButton variant="contained" size="medium" color='success' onClick={addNewTaskModal.open}>
            <AddIcon /> Add new
        </AddButton>
        <TaskList {...taskListProps} />
        <AddTaskModal open={addNewTaskModal.isOpen} onClose={addNewTaskModal.close} onOk={onAddNewTask}/>
    </div>
    </Container>
}

export default React.memo(TodoList)