import type { ErrorRequestHandler } from 'express'
import { ApiError } from '../shared/exceptions'

export const errorMiddleware: ErrorRequestHandler = function (err, req, res, next) {
    console.error(err)
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    }

    return res.status(500).json({ message: 'Unexpected error', error: err })
}
