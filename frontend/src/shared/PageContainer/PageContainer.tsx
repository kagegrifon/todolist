import * as React from 'react';
import { styled } from 'shared/globalDeps';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100%;
`

const Spacer = styled.div`
    flex-grow: 1;
`

interface IPageContainer {
    children: JSX.Element | JSX.Element[],
    className?: string,
}

export let PageContainer: React.FC<IPageContainer> = ({ children, className }) => {
    return <Container className={className}>
        {children}
        <Spacer/>
    </Container>
}

PageContainer = React.memo(PageContainer)