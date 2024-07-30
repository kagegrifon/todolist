import type { Response } from 'express'

export function handleControllerError({ res, e }: { res: Response; e: Error }) {
    console.error(e)
    res.status(500).send(e)
}
