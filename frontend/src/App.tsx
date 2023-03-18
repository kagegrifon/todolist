import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './globalStyles/muiGlobal'

import { MainPage } from './page/Main'

import './globalStyles/App.scss' 


export const App: React.FC = () => <ThemeProvider theme={theme}><MainPage /></ThemeProvider>
