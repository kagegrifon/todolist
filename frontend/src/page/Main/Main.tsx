import * as React from 'react'
import { PageContainer } from 'shared/component/PageContainer'
import { TodoList } from 'widget/TodoList'

import { TextureBackground, TopBackground } from 'shared/component/Background'
import { ProfileAvatar } from 'shared/component/ProfileAvatar/ProfileAvatar'
import styled from '@emotion/styled'
import { AppContext } from 'store'
import { Navigate } from 'react-router-dom'

const TESTING_PROP = {
    userName: {
        lastName: 'Kent',
        firstName: 'Dodds',
    },
    onLogout: () => console.log('logout'),
}

export const TopBlock = styled.div`
    width: 100%;

    padding: 15px 15px;
    display: flex;
    justify-content: end;
`

export const GreetingHeading = styled.h2`
    text-align: center;
    font-size: 28px;
`

export let MainPage: React.FC = () => {
    const { user } = React.useContext(AppContext)

    if (!user) {
        return <Navigate to={'/login'} replace />
    }

    return (
        <PageContainer>
            <TextureBackground />
            <TopBackground />
            <TopBlock>
                <ProfileAvatar {...TESTING_PROP} />
            </TopBlock>
            <GreetingHeading>Hello, {TESTING_PROP.userName.firstName}!</GreetingHeading>
            <TodoList />
        </PageContainer>
    )
}

MainPage = React.memo(MainPage)
