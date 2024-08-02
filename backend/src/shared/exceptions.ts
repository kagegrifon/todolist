type StatusCode = number

export class ApiError extends Error {
    status: StatusCode
    error: any

    constructor({
        status,
        message,
        error = null,
    }: {
        status: StatusCode
        message: string
        error?: any
    }) {
        super(message)
        this.status = status
        this.error = error
    }

    static UnauthorizedError() {
        return new ApiError({ status: 401, message: 'User is not authorized' })
    }

    static BadRequest({ message, error }: { message: string; error?: any }) {
        return new ApiError({ status: 400, message, error })
    }

    static NotFound({ message, error }: { message: string; error?: any }) {
        return new ApiError({ status: 404, message, error })
    }
}
