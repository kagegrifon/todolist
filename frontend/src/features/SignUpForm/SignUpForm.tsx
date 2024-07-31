import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export let SignUpForm: React.FC = () => {
    return (
        <Box
            component='form'
            onSubmit={(e) => {
                e.preventDefault()
                console.log('sign up')
            }}
            noValidate
            sx={{ mt: 1 }}
        >
            <TextField
                margin='normal'
                required
                fullWidth
                id='login'
                label='Login'
                name='login'
                autoFocus
            />
            <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
            />
            <TextField
                margin='normal'
                required
                fullWidth
                name='repeat_password'
                label='Repeat Password'
                type='password'
                id='repeat_password'
            />

            <Button
                type='submit'
                fullWidth
                variant='contained'
                color='success'
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Up
            </Button>
        </Box>
    )
}

SignUpForm = React.memo(SignUpForm)
