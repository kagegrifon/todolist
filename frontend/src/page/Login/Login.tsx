import * as React from 'react'
import { PageContainer } from 'shared/component/PageContainer'

import { Spacer } from 'shared/component/Spacer'
import { TextureBackground, TopBackground } from 'shared/component/Background'
import { Link } from 'react-router-dom'


export let LoginPage: React.FC = () => {
    return (

        <PageContainer>
                    <Link to="login">Your Name</Link>
            <TextureBackground />
            <TopBackground />
            <Spacer />
        </PageContainer>
    )
}

LoginPage = React.memo(LoginPage)
