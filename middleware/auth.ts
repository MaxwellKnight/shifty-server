import jwt from 'jsonwebtoken'
import constants from '../constants'
import { createError } from '../utils/error'

export const verifyToken = (req: any, res: any, next: any) => {
    const token = req.cookies.access_token
    if (!token)
        next(createError(401, 'You are not authenticated!'))

    jwt.verify(token, constants.JWT, (err: any, agent: any) => {
        if (err) {
            next(createError(403, 'Token is not valid!'))
        }
        req.user = { ...agent }
        next()
    })
}

export const verifyAgent = (req: any, res: any, next: any) => {
    if (req.user.id === req.params.id || req.user.role === 'admin') {
        next()
    }
    else {
        next(createError(403, 'You are not allowed!'))
    }
}

export const verifyAdmin = (req: any, res: any, next: any) => {
    if (req.user.role === 'admin') {
        return next()
    }
    else {
        return next(createError(403, 'You are not allowed!'))
    }
}
