import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { todoRouter } from './entity/todo'
import { dbSetup } from 'data-access/dbSetup'
import { PORT } from 'config/env'
import { authRouter } from 'entity/auth'
import { errorMiddleware } from './middleware/error-middleware'
import { authMiddleware } from 'middleware/auth-middleware'

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)

app.use('/api/todo', authMiddleware, todoRouter)
app.use(errorMiddleware)

function start() {
    try {
        dbSetup()
        app.listen(PORT, () => {
            return console.log(`Express is listening at http://localhost:${PORT}`)
        })
    } catch (e) {
        console.error(e)
    }
}

start()
