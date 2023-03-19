import * as React from 'react'

interface ITitle {
    children: React.ReactElement | string 
}

export const Title: React.FC<ITitle> = ({children}) => {
    if (typeof children !== 'object') {
        return <h1>{children}</h1>
    } else {
        return children
    }
}
