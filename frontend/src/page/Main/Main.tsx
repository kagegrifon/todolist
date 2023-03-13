import * as React from 'react'
import { styled } from "shared/globalDeps"
import { PageContainer } from "shared/PageContainer"
import { TodoList } from "widget/TodoList"

const StyledPageContainer = styled(PageContainer)`
    padding-top: 175px;
`

export const MainPage: React.FC = () => {
    return <StyledPageContainer>
        <TodoList />
    </StyledPageContainer>
} 