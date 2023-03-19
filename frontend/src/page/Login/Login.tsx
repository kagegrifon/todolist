import * as React from 'react'
import { PageContainer } from 'shared/component/PageContainer'


import { Spacer } from 'shared/component/Spacer'
import { TextureBackground, TopBackground } from 'shared/component/Background'


export let Login: React.FC = () => {
    return (
        <PageContainer>
            <TextureBackground />
            <TopBackground />
            <Spacer />
        </PageContainer>
    )
}

Login = React.memo(Login)
