import * as React from 'react'
import { styled } from 'shared/globalDeps'
import { PageContainer } from 'shared/PageContainer'
import { TodoList } from 'widget/TodoList'

import MainBackgroundBottomPart from 'assets/img/mainBackground_bottom_part.jpg'
import MainBackgroundTopPart from 'assets/img/mainBackground_top_part.jpg'
import { Spacer } from 'shared/Spacer'

const StyledPageContainer = styled(PageContainer)`
    position: relative;
    padding-top: 175px;

    background-position: 0 383px;
    background-size: contain;
    background-repeat: repeat;
`

const TopBackground = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    padding-top: calc(100% / 3.245);
    background-image: url(${MainBackgroundTopPart});

    background-size: contain;
    background-repeat: no-repeat;
    z-index: -1;
`

const TextureBackground = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(${MainBackgroundBottomPart});

    background-size: contain;
    z-index: -1;
`

export let MainPage: React.FC = () => {
    return (
        <StyledPageContainer>
            <TextureBackground />
            <TopBackground />
            <TodoList />
            <Spacer />
        </StyledPageContainer>
    )
}

MainPage = React.memo(MainPage)
