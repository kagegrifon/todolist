import * as React from 'react'
import { PageContainer } from 'shared/component/PageContainer'
import { TodoList } from 'widget/TodoList'

import { TextureBackground, TopBackground } from 'shared/component/Background'

export let MainPage: React.FC = () => {
    return (
        <PageContainer>
            <TextureBackground />
            <TopBackground />
            <TodoList />
        </PageContainer>
    )
}

MainPage = React.memo(MainPage)
