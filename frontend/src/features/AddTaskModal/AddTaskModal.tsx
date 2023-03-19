import * as React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ITask } from 'entity/Task';
import { styled } from 'shared/globalDeps';

const Container = styled(Box)`
display: flex;
flex-direction: column;
gap: 20px;
width: 400px;
    position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background: white;
padding: 30px;
border-radius: 5px;
`

const Title = styled.h3`
    margin: 0;
`

export interface IAddTaskModal {
    open: boolean
    onOk: (newTaskData: Pick<ITask, 'name'>) => void
    onClose: () => void
}

export const AddTaskModal: React.FC<IAddTaskModal> = ({ open, onOk, onClose }) => {
    const [taskName, setTaskName] = React.useState('');

    const onAddButtonClick = React.useCallback(() => {
        onOk({ name: taskName })
        onClose()
    }, [onClose, onOk, taskName])

    const onNameChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => { setTaskName(e.target.value) }
        , [setTaskName])

    const onKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => { 
            if (e.key === 'Enter' && !!taskName) {
                e.preventDefault()
                e.stopPropagation()
                onAddButtonClick()
            }}
    , [onAddButtonClick, taskName])

    return <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Container>
            <Title>New Task</Title>
            <TextField
                required
                multiline
                name="name"
                onChange={onNameChange}
                onKeyDown={onKeyDown}
                autoFocus
            />

            <Button variant="contained" color='success' onClick={onAddButtonClick} sx={{textTransform: 'none'}}>Add</Button>
        </Container>
    </Modal>
}
