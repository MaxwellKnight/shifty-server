import { Response, Request, NextFunction } from 'express'
import { createError } from "../../utils/error"
import { register, login } from "../services/auth"

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    if (!(username && password)) return next(createError(400, 'missing credentials'))

    const { error, data, token } = await login(username, password)
    if (error) return next(createError(403, error))

    res
        .cookie("access_token", token, { httpOnly: true, })
        .status(200)
        .json({ data })
}

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, data } = await register(req.body)
        if (data) {
            res
                .status(201)
                .json({ data })
        }
        else if (error) next(createError(400))
    } catch (error) {
        next(createError())
    }
}