import * as React from 'react';
import { styled } from 'shared/globalDeps';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100%;
    position: relative;
`

interface IPageContainer {
    children: JSX.Element | JSX.Element[],
    className?: string,
}

export let PageContainer: React.FC<IPageContainer> = ({ children, className }) => {
    return <Container className={className}>
        {children}
    </Container>
}

PageContainer = React.memo(PageContainer)