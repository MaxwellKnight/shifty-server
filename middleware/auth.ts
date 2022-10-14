import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import constants from '../constants'
import { createError } from '../utils/error'


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token
    if (!token)
        next(createError(401, 'You are not authenticated!'))

    jwt.verify(token, constants.JWT, (err: any, agent: any) => {
        if (err) {
            next(createError(403, 'Token is not valid!'))
        }
        req.body.user = { ...agent }
        next()
    })
}

export const verifyAgent = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body
    if (user.id === req.params.id || user.role === 'admin') {
        next()
    }
    else {
        next(createError(403, 'You are not allowed!'))
    }
}

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body
    if (user.role === 'admin') {
        return next()
    }
    else {
        return next(createError(403, 'You are not allowed!'))
    }
}
