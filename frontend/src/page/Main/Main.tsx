import * as React from 'react'
import { PageContainer } from 'shared/component/PageContainer'
import { TodoList } from 'widget/TodoList'

import { Spacer } from 'shared/component/Spacer'
import { TextureBackground, TopBackground } from 'shared/component/Background'

export let MainPage: React.FC = () => {
    return (
        <PageContainer>
            <TextureBackground />
            <TopBackground />
            <TodoList />
            <Spacer />
        </PageContainer>
    )
}

MainPage = React.memo(MainPage)
