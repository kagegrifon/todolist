import { FC } from "react";
import { styled } from "shared/globalDeps";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Spacer = styled.div`
    flex-grow: 1;
`

interface IPageContainer {
    children: JSX.Element,
    className?: string,
}

export const PageContainer: FC<IPageContainer> = ({ children, className }) => {
    return <Container className={className}>
        {children}
        <Spacer/>
    </Container>
}