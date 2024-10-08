import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useUserAuthAPI } from '../../entity/UserAuth'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { ISuccessAuthDTO } from 'entity/UserAuth/type'

type SignUpFormProps = { onSuccess: (userData: ISuccessAuthDTO) => void }

export let SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
    const [login, setLogin] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [repeatPass, setRepeatPass] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [showRepeatPass, setShowRepeatPass] = React.useState(false)

    const userAuthAPI = useUserAuthAPI()

    return (
        <Box
            component='form'
            onSubmit={async (e) => {
                e.preventDefault()

                try {
                    const userData = await userAuthAPI.register({ login, password })
                    onSuccess(userData)
                } catch (e) {
                    console.error(e)
                }
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
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end' style={{ marginRight: '5px' }}>
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={() => setShowPassword((curValue) => !curValue)}
                                edge='end'
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                margin='normal'
                required
                fullWidth
                name='repeat_password'
                label='Repeat Password'
                type={showRepeatPass ? 'text' : 'password'}
                id='repeat_password'
                value={repeatPass}
                onChange={(e) => setRepeatPass(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end' style={{ marginRight: '5px' }}>
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={() => setShowRepeatPass((curValue) => !curValue)}
                                edge='end'
                            >
                                {showRepeatPass ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
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
