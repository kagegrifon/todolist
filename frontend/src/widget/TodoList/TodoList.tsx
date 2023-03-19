import { TaskList } from 'features/TaskList'
import * as React from 'react'
import { Title } from 'shared/Title'
import { useTodoList } from './useTodoList'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { AddTaskModal } from 'features/AddTaskModal'
import { styled } from 'shared/globalDeps'

const AddButton = styled(Button)`
    text-transform: none;
    margin: 0 10px 20px 10px;
    align-self: stretch;
`
const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const TodoList: React.FC = () => {
    const { taskListProps, onAddNewTask, addNewTaskModal } = useTodoList()

    return (
        <Container>
            <InnerWrapper>
                <Title>TodoList</Title>
                <AddButton
                    variant='contained'
                    size='medium'
                    color='success'
                    onClick={addNewTaskModal.open}
                >
                    <AddIcon /> Add new
                </AddButton>
                <TaskList {...taskListProps} />
                <AddTaskModal
                    open={addNewTaskModal.isOpen}
                    onClose={addNewTaskModal.close}
                    onOk={onAddNewTask}
                />
            </InnerWrapper>
        </Container>
    )
}

export default { TodoList: React.memo(TodoList) } 
