import { MainPage } from 'page/Main'
import { LoginPage } from 'page/Login'

import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from 'page/Error'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
])
