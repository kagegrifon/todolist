import * as React from 'react'
import { PageContainer } from 'shared/component/PageContainer'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

import { TextureBackground, TopBackground } from 'shared/component/Background'
import { styled } from 'shared/globalDeps'
import { LoginForm } from 'features/LoginForm'
import { SignUpForm } from 'features/SignUpForm'
import { useNavigate } from 'react-router-dom'

const StyledPageContainer = styled(PageContainer)`
    display: flex;
    align-items: center;
    justify-content: center;
`

const SmallButtonLink = styled(Button)`
    border: none;
    background: none;
    font-size: 18px;

    &:hover {
        border: none;
        background: none;
    }
`

export let LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = React.useState(true)

    const switchLoginMode = React.useCallback(() => {
        setIsLogin((prev) => !prev)
    }, [])

    const onSuccess = () => {
        navigate('/')
    }

    return (
        <StyledPageContainer>
            <TextureBackground />
            <TopBackground />
            <Container component='main' maxWidth='xs'>
                {isLogin ? (
                    <LoginForm onSuccess={onSuccess} />
                ) : (
                    <SignUpForm onSuccess={onSuccess} />
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <SmallButtonLink
                        variant='text'
                        size='small'
                        fullWidth
                        onClick={switchLoginMode}
                    >
                        {isLogin
                            ? "Don't have an account here? Sign Up"
                            : 'Already have an account? Sign In'}
                    </SmallButtonLink>
                </Box>
            </Container>
        </StyledPageContainer>
    )
}

LoginPage = React.memo(LoginPage)
