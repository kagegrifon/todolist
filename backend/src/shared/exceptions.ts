type StatusCode = number

export class ApiError extends Error {
    status: StatusCode
    errors: string[]

    constructor({
        status,
        message,
        errors = [],
    }: {
        status: StatusCode
        message: string
        errors?: string[]
    }) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError({ status: 401, message: 'User is not authorized' })
    }

    static BadRequest({ message, errors }: { message: string; errors?: string[] }) {
        return new ApiError({ status: 400, message, errors })
    }
}
